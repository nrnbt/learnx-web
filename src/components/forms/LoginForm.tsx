'use client'

import { useAuthContext } from '@/providers/auth'
import { EdxUserInfo, OpenEdxCredentials } from '@/providers/auth/types'
import { useSnackbar } from '@/providers/toaster'
import { encryptData } from '@/utils/crypro'
import { Button, TextField } from '@mui/material'
import { styled } from '@mui/system'
import axios from 'axios'
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import * as Yup from 'yup'

interface LoginFormValues {
  emailOrUsername: string
  password: string
}

const Container = styled('div')`
  @apply max-w-md mx-auto p-6 bg-white rounded-md shadow-md;
`

const Title = styled('h1')`
  @apply text-2xl font-bold text-center mb-4;
`

const FormField = styled('div')`
  @apply mb-4;
`

const validationSchema = Yup.object({
  emailOrUsername: Yup.string()
    .required('This field is required.'),
  password: Yup.string()
    .required('This field is required.')
})

const LoginForm: FunctionComponent = () => {
  const initialValues: LoginFormValues = {
    emailOrUsername: '', password: ''
  }

  const { showSnackbar } = useSnackbar()
  const { login } = useAuthContext()
  const router = useRouter()

  const handleNavigateRegister = (): void => {
    router.push('/register')
  }

  const onSubmit = async (values: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>): Promise<void> => {
    const { resetForm, setSubmitting } = formikHelpers
    try {
      const encryptedData = encryptData(values)
      const response = await axios.post('/api/login', {
        data: encryptedData
      })

      if (response.status !== 200) {
        showSnackbar('Network response was not ok', 'error')
        throw new Error('Network response was not ok')
      }

      const resultMsg = response.data?.message
      if (resultMsg === 'Login successful.') {
        let edxUserInfo: EdxUserInfo = {
          email: '',
          header_urls: {
            logout: '',
            account_settings: '',
            learner_profile: ''
          },
          user_image_urls: {
            full: '',
            large: '',
            medium: '',
            small: ''
          },
          username: '',
          version: 0
        }
        const edxUserInfoRaw: string = response.data?.credentials['edx-user-info'].replace(/\\054/g, ',').replace(/\\/g, '') ?? ''

        if (edxUserInfoRaw.startsWith('"') && edxUserInfoRaw.endsWith('"')) {
          edxUserInfo = JSON.parse(`${edxUserInfoRaw.slice(1, -1)}`) as EdxUserInfo
        }

        const credRawData = response.data?.credentials

        const credData: OpenEdxCredentials = {
          csrfToken: response.data?.credentials.csrftoken,
          edxUserInfo,
          edxJwtCookieHeaderPayload: response.data?.credentials['edx-jwt-cookie-header-payload'],
          edxJwtCookieSignature: response.data?.credentials['edx-jwt-cookie-signature'],
          edxLoggedIn: JSON.parse(response.data?.credentials.edxloggedin),
          openedxLanguagePreference: response.data?.credentials['openedx-language-preference'],
          sessionId: response.data?.credentials.sessionid
        }

        await login(credData, credRawData)
        showSnackbar(resultMsg, 'info')
      } else {
        showSnackbar('Network response was not ok', 'error')
      }

      resetForm()
    } catch (error: any) {
      const errorCode = error?.response?.data?.errorCode
      const errorVal = error?.response?.data?.errorVal

      const accumulatedErrors = {
        usernameOrEmail: '',
        password: ''
      }

      if (errorVal === 'There was an error receiving your login information. Please email us.') {
        showSnackbar("We couldn't sign you in. In order to sign in, you need to activate your account. We just sent an activation link to . If you do not receive an email, check your spam folders or contact LearnX support.", 'error')
      }

      if (errorCode === 'inactive-user') {
        accumulatedErrors.password = "We couldn't sign you in. In order to sign in, you need to activate your account. We just sent an activation link to test-user5@gmail.com. If you do not receive an email, check your spam folders or contact LearnX support."
      } else {
        accumulatedErrors.password = errorCode
      }

      console.error('Form submission error:', error)
      if (errorCode === 'incorrect-email-or-password') {
        showSnackbar('Email or password is incorrect!', 'error')
      } else {
        showSnackbar('Login failed!', 'error')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleSSL = (methdod: 'facebook' | 'google' | 'apple'): void => {
    signIn(methdod)
      .catch((e) => {
        showSnackbar(`${methdod} login failed.`, 'error')
        console.error(e)
      })
  }

  return (
    <Container className='flex flex-col gap-8 w-full items-center'>
      <Title className='flex text-white font-semibold text-2xl'>Login to Learn<div className='text-secondary'>X</div>.</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, handleChange, handleBlur }) => (
          <Form className='flex flex-col gap-8 max-w-96 w-full'>
            <FormField className='relative'>
              <TextField
                name='emailOrUsername'
                label='Email or Username'
                fullWidth
                variant='outlined'
                value={values.emailOrUsername}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name='emailOrUsername' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <FormField className='relative'>
              <TextField
                name='password'
                label='Password'
                type='password'
                fullWidth
                variant='outlined'
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name='password' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <Button type='submit' variant='contained' color='secondary' fullWidth disabled={isSubmitting}>
              Login
            </Button>
          </Form>
        )}
      </Formik>

      <div className='flex flex-col items-center gap-4'>
        <Button
          variant='text'
          color='secondary'
          fullWidth
          onClick={() => handleSSL('google')}
        >
          Login with Google
        </Button>
        <Button
          variant='text'
          color='primary'
          fullWidth
          onClick={() => handleSSL('facebook')}
        >
          Login with Facebook
        </Button>
      </div>

      <div
        className='text-white hover:cursor-pointer mt-4'
        onClick={handleNavigateRegister}
      >
        Don't have an account? Register
      </div>
    </Container>
  )
}

export default LoginForm
