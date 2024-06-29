'use client'

import { FunctionComponent } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { TextField, Button } from '@mui/material'
import { styled } from '@mui/system'

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
    .required('This field is required.'),
  email: Yup.string()
    .email('A properly formatted e-mail is required')
    .required('This field is required.'),
  password: Yup.string()
    .required('This field is required.'),
  name: Yup.string()
    .min(1, 'Your legal name must be a minimum of one character long.')
    .required('This field is required.')
})

const RegisterForm: FunctionComponent = () => {
  return (
    <Container className='flex flex-col gap-8'>
      <Title className='text-white font-semibold text-xl'>Register</Title>
      <Formik
        initialValues={{ username: '', email: '', password: '', name: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Handle form submission
          console.log(values)
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form className='flex flex-col gap-8'>
            <FormField className='relative'>
              <Field
                as={TextField}
                name='username'
                label='Username'
                fullWidth
                variant='outlined'
              />
              <ErrorMessage name='username' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <FormField className='relative'>
              <Field
                as={TextField}
                name='email'
                label='Email'
                fullWidth
                variant='outlined'
              />
              <ErrorMessage name='email' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <FormField className='relative'>
              <Field
                as={TextField}
                name='password'
                label='Password'
                type='password'
                fullWidth
                variant='outlined'
              />
              <ErrorMessage name='password' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <FormField className='relative'>
              <Field
                as={TextField}
                name='name'
                label='Name'
                fullWidth
                variant='outlined'
              />
              <ErrorMessage name='name' component='div' className='absolute -bottom-6 text-red-500 text-sm mt-1' />
            </FormField>

            <Button type='submit' variant='contained' color='primary' fullWidth disabled={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default RegisterForm
