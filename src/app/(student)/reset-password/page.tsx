'use client'

import { useSnackbar } from '@/providers/toaster'
import { isNOU } from '@/utils/null-check'
import { Button, CircularProgress, TextField } from '@mui/material'
import { styled } from '@mui/system'
import axios from 'axios'
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import * as Yup from 'yup'

interface ResetPasswordFormValues {
  email: string
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
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required.')
})

const ResetPassword: FunctionComponent = () => {
  const initialValues: ResetPasswordFormValues = {
    email: ''
  }

  const { showSnackbar } = useSnackbar()

  const onSubmit = async (values: ResetPasswordFormValues, formikHelpers: FormikHelpers<ResetPasswordFormValues>): Promise<void> => {
    const { resetForm, setSubmitting } = formikHelpers
    try {
      const response = await axios.post('/api/reset-password', {
        email: values.email
      })

      if (response.status !== 200) {
        showSnackbar('Network response was not ok', 'error')
        throw new Error('Network response was not ok')
      }

      showSnackbar('Password reset link sent. Please check your email.', 'info')
      resetForm()
    } catch (error: any) {
      const errorVal = error?.response?.data?.errorVal
      showSnackbar(!isNOU(errorVal) ? errorVal : 'Reset password failed!', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Container className='flex flex-col gap-8 w-full items-center h-full'>
      <Title className='flex text-white font-semibold text-2xl'>Reset Your Password</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, handleChange, handleBlur }) => (
          <Form className='flex flex-col gap-8 max-w-96 w-full'>
            <FormField className='relative'>
              <TextField
                name='email'
                label='Email'
                fullWidth
                variant='outlined'
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name='email' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <Button className='gap-4' type='submit' variant='contained' color='secondary' fullWidth disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={20} /> : ''}
              Reset Password
            </Button>
            <div className='text-white flex justify-center hover:underline'>
              <Link href='/login'>Back to Login</Link>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default ResetPassword
