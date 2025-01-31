'use client'

import { useSnackbar } from '@/providers/toaster'
import { isNOU } from '@/utils/null-check'
import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
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
  const [loginErrorMsg, setLoginErrorMsg] = useState('')

  const { showSnackbar } = useSnackbar()
  const route = useRouter()

  const onSubmit = async (values: LoginFormValues, formikHelpers: FormikHelpers<LoginFormValues>): Promise<void> => {
    const { resetForm, setSubmitting } = formikHelpers
    const signInResponse = await signIn('credentials', {
      email: values.emailOrUsername,
      password: values.password,
      redirect: false
    })

    if (!isNOU(signInResponse?.error)) {
      setLoginErrorMsg(signInResponse.error)
    } else {
      setLoginErrorMsg('')
      resetForm()
    }

    if (!isNOU(signInResponse) && signInResponse.ok) {
      showSnackbar('Login successful', 'success')
      await route.push('/dashboard')
    }

    setSubmitting(false)
  }

  return (
    <Container className='flex flex-col gap-8 w-full items-center'>
      <Title className='flex text-white font-semibold text-3xl'>Login to Learn<div className='text-secondary'>X</div>.</Title>
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

            {loginErrorMsg !== '' && <Alert severity='error'>{loginErrorMsg}</Alert>}

            <Button className='gap-4' type='submit' variant='contained' color='secondary' fullWidth disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={20} /> : ''}
              Login
            </Button>
            <div className='text-white flex justify-center hover:underline'>
              <Link href='/reset-password'>Reset Password</Link>
            </div>
          </Form>
        )}
      </Formik>

      <div
        className='text-white hover:cursor-pointer mt-4'
      >
        <Link href='/register'>Don't have an account? Register</Link>
      </div>
    </Container>
  )
}

export default LoginForm
