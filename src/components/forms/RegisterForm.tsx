'use client'

import { useSnackbar } from '@/providers/toaster'
import { encryptData } from '@/utils/crypro'
import { isNOU } from '@/utils/null-check'
import { Button, TextField } from '@mui/material'
import { styled } from '@mui/system'
import axios from 'axios'
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik'
import { useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import * as Yup from 'yup'

interface RegisterFormValues {
  username: string
  email: string
  password: string
  name: string
}

interface Props {
  courseId?: string
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
  username: Yup.string()
    .min(2, 'Username must be between 2 and 30 characters long.')
    .max(30, 'Username must be between 2 and 30 characters long.')
    .required('Username field is required.'),
  email: Yup.string()
    .email('A properly formatted e-mail is required')
    .required('Email field is required.'),
  password: Yup.string()
    .min(6, 'Username must be between 6 and 30 characters long.')
    .max(30, 'Username must be between 6 and 30 characters long.')
    .required('Password field is required.'),
  name: Yup.string()
    .min(1, 'Your legal name must be a minimum of one character long.')
    .required('Name field is required.')
})

const RegisterForm: FunctionComponent<Props> = ({ courseId }) => {
  const innitialValues: RegisterFormValues = {
    username: '', email: '', password: '', name: ''
  }

  const { showSnackbar } = useSnackbar()
  const router = useRouter()

  const handleNavigateLogin = (): void => {
    router.push('/login')
  }

  const onSubmit = async (values: RegisterFormValues, formikHelpers: FormikHelpers<RegisterFormValues>): Promise<void> => {
    const { resetForm, setSubmitting, setErrors } = formikHelpers
    try {
      const encryptedData = encryptData(values)
      const response = await axios.post('/api/register', {
        data: encryptedData,
        courseId
      })

      if (response.status !== 200) {
        showSnackbar('Network response was not ok', 'error')
        throw new Error('Network response was not ok')
      }

      const result = await response.data?.message
      if (result === 'User registered') {
        showSnackbar(result, 'info')
        handleNavigateLogin()
      } else {
        showSnackbar('Network response was not ok', 'error')
      }

      resetForm()
    } catch (error: any) {
      const resData = error?.response?.data?.errors

      if (!isNOU(resData)) {
        const accumulatedErrors = {
          username: '',
          email: '',
          password: '',
          name: ''
        }

        if (!isNOU(resData.username) && Array.isArray(resData.username) && resData.username.length > 0) {
          accumulatedErrors.username = resData.username[0].user_message
        }

        if (!isNOU(resData.email) && Array.isArray(resData.email) && resData.email.length > 0) {
          accumulatedErrors.email = resData.email[0].user_message
        }

        if (!isNOU(resData.password) && Array.isArray(resData.password) && resData.password.length > 0) {
          accumulatedErrors.password = resData.password[0].user_message
        }

        if (!isNOU(resData.name) && Array.isArray(resData.name) && resData.name.length > 0) {
          accumulatedErrors.name = resData.name[0].user_message
        }

        setErrors(accumulatedErrors)
      }

      console.error('Form submission error:', error)
      showSnackbar('Error on submit.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className='flex flex-col gap-8 w-full items-center'>
      <Title className='text-white font-semibold text-2xl'>
        <div className='flex'>
          Register as student in Learn
          <div className='text-secondary'>X</div>.
        </div>
      </Title>
      <Formik
        initialValues={innitialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, handleChange, handleBlur }) => (
          <Form className='flex flex-col gap-8 max-w-96 w-full'>
            <FormField className='relative'>
              <TextField
                value={values.username}
                name='username'
                label='Username'
                fullWidth
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name='username' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <FormField className='relative'>
              <TextField
                value={values.email}
                name='email'
                label='Email'
                fullWidth
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name='email' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <FormField className='relative'>
              <TextField
                value={values.name}
                name='name'
                label='Name'
                fullWidth
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name='name' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <FormField className='relative'>
              <TextField
                value={values.password}
                name='password'
                label='Password'
                type='password'
                fullWidth
                variant='outlined'
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name='password' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <Button type='submit' variant='contained' color='secondary' fullWidth disabled={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
      <div
        className='text-white hover:cursor-pointer hover:underline'
        onClick={handleNavigateLogin}
      >
        Already have account?
      </div>
    </Container>
  )
}

export default RegisterForm
