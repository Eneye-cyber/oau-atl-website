import { z } from 'zod'

const passwordSchema = z.string().min(8, { message: 'Password must be at least 8 characters long' });

export const SignUpFormDataSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  username: z.string().min(1, 'Username is required'),
  password: passwordSchema,
  confirm_password:  z.string().min(1, { message: 'Please confirm your password' }),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(1, 'Phone is required'),
  birthDate: z.string().min(1, 'Birthday is required').refine(
    (date) => /^\d{2}\/\d{2}$/.test(date), // Regular expression for MM/DD format
    { message: 'Birth date must be in MM/DD format' }
  ),
  yearGraduated: z.string().min(1, 'Graduation year is required'),
  studyField: z.string().min(1, 'Field of study is required'),
  address: z.string().min(1, 'Street is required'),
  address2: z.string(),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  hobbies: z.string().optional().refine(
    (hobbyString) =>
      !hobbyString || // Allow empty or undefined
      hobbyString.split(',').every((hobby) => hobby.trim().length > 0),
    { message: 'Hobbies must be a comma-separated list of non-empty values' }
  )
  .transform((hobbyString) =>
    hobbyString
      ? hobbyString.split(',').map((hobby) => hobby.trim()) // Transform only if provided
      : []
  ),
}).superRefine((val, ctx) => {
  if (val.password !== val.confirm_password) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Password is not the same as confirm password',
      path: ['confirm_password'],
    })
  }
  })

export const SignInFormDataSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: passwordSchema,
})

export const ContactFormDataSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  fullName: z.string().min(1, 'Email is required'),
  subject: z.string(),
  message: z.string().min(1, 'Email is required'),
})

export const CreateEventSchema = z.object({
  title: z.string().min(1, 'Event name is required'),
  imageUrl: z.string().min(1, 'Event image is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  tags: z.string().min(1, 'Tags are required').refine(
    (tags) =>
      !tags || // Allow empty or undefined
      tags.split(',').every((tag) => tag.trim().length > 0),
    { message: 'Hobbies must be a comma-separated list of non-empty values' }
  )
  .transform((tags) =>
    tags
      ? tags.split(',').map((tag) => tag.trim()) // Transform only if provided
      : []
  ),
  content: z.string().min(1, 'Event description is required'),
  entranceFee: z.number().min(0, 'Ticket price must be at least 0'),
  isFeatured: z.enum(['0', '1']),
  locationName: z.string().min(1, 'Location name is required'),
  city: z.string().min(1, 'Location city is required'),
  state: z.string().min(1, 'Location State is required'),
  address: z.string().min(1, 'Location address is required'),
}).superRefine((val, ctx) => {
  const { startDate, endDate } = val; // Access parent to get startDate value
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End date must be later than start date',
      path: ['startDate', 'endDate'],
    })// endDate must be later than startDate
  }
});

export const CreateProjectSchema = z.object({
  amountGoal: z.union([z.number().min(0, "Amount goal must be at least 0"), z.string().transform((val) => Number(val))]), // Ensure it's non-negative
  projectText: z.string().min(1, "Project description is required"),
  // isFeatured: z.boolean(),
  // createdBy: z.string().uuid("Invalid UUID for createdBy"),
  imageURL: z.string().url("Invalid image URL"),
  projectTitle: z.string().min(1, "Project title is required"),
  deadline: z.string().min(1, "Deadline is required"),
  city: z.string().min(1, 'Location city is required'),
  state: z.string().min(1, 'Location State is required'),
  postalCode: z.string().min(1, 'Location postal code is required'),
});