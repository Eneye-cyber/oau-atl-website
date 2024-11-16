import { z } from 'zod'

const passwordSchema = z.string().min(8, { message: 'Password must be at least 8 characters long' });

export const SignUpFormDataSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: passwordSchema,
  confirm_password: passwordSchema,
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  birthday: z.string().min(1, 'Birthday is required'),
  graduation_year: z.string().min(1, 'Graduation year is required'),
  field_of_study: z.string().min(1, 'Field of study is required'),
  address: z.string().min(1, 'Street is required'),
  address2: z.string(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'Zip is required')
})

export const SignInFormDataSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: passwordSchema,
})

export const ContactFormDataSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  fullname: z.string().min(1, 'Email is required'),
  subject: z.string(),
  message: z.string().min(1, 'Email is required'),
})