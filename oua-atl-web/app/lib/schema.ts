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
    (date) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date), // Regular expression for MM/DD format
    { message: 'Birth date must be in YYYY-MM-DD format' }
  ),
  yearGraduated: z.union([z.number().min(1966, "Graduation year is required"), z.string().transform((val) => Number(val))]),
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

  export const EditUserProfileSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().min(1, 'Phone is required'),
    birthDate: z.string().min(1, 'Birthday is required').refine(
      (date) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date), // Regular expression for MM/DD format
      { message: 'Birth date must be in YYYY-MM-DD format' }
    ),
    yearGraduated: z.union([z.number().min(1966, "Graduation year is required"), z.string().transform((val) => Number(val))]),
    studyField: z.string().min(1, 'Field of study is required'),
    address: z.string().min(1, 'Street is required'),
    address2: z.string(),
    city: z.string().min(1, 'City is required'),
    zipCode: z.string().min(1, 'Zip code is required'),
    hobbies: z.union([
      z.string().optional().refine(
        (hobbyString) =>
          !hobbyString || // Allow empty or undefined
          hobbyString.split(',').every((hobby) => hobby.trim().length > 0),
        { message: 'Hobbies must be a comma-separated list of non-empty values' }
      ),
      z.array(z.string()).refine(
        (hobbies) => hobbies.every((hobby) => hobby.trim().length > 0),
        { message: 'Hobbies must be an array of non-empty strings' }
      ),
    ])
    .transform((hobbies) => {
      if(hobbies)
      return Array.isArray(hobbies)
        ? hobbies.map((hobby) => hobby.trim()) // If it's already an array, trim all values
        : hobbies.split(',').map((hobby) => hobby.trim()) // If it's a string, split and trim
    }),
  })
  

  export const ResetPasswordFormDataSchema = z.object({
    id: z.string().optional(),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    oldPassword: passwordSchema,
    newPassword: passwordSchema
  }).superRefine((val, ctx) => {
    if (val.oldPassword === val.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'New password cannot be the same as old password',
        path: ['newPassword'],
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
    { message: 'Tags must be a comma-separated list of non-empty values' }
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

export const EditEventSchema = z.object({
  title: z.string().min(1, 'Event name is required'),
  imageUrl: z.string().min(1, 'Event image is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  tags: z
  .union([
    z.string().min(1, 'Tags are required').refine(
      (tags) =>
        tags.split(',').every((tag) => tag.trim().length > 0),
      { message: 'Tags must be a comma-separated list of non-empty values' }
    ),
    z.array(z.string()).refine(
      (tags) => tags.every((tag) => tag.trim().length > 0),
      { message: 'Tags must be an array of non-empty strings' }
    ),
  ])
  .transform((tags) =>
    Array.isArray(tags)
      ? tags.map((tag) => tag.trim()) // If it's already an array, trim all values
      : tags.split(',').map((tag) => tag.trim()) // If it's a string, split and trim
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

export const EditProjectSchema = z.object({
  amountGoal: z.union([z.number().min(0, "Amount goal must be at least 0"), z.string().transform((val) => Number(val))]), // Ensure it's non-negative
  projectText: z.string().min(1, "Project description is required"),
  imageURL: z.string().url("Invalid image URL"),
  projectTitle: z.string().min(1, "Project title is required"),
  deadline: z.string().min(1, "Deadline is required"),
  city: z.string().min(1, 'Location city is required'),
  state: z.string().min(1, 'Location State is required'),
  address: z.string(),
});

export const ExecutiveSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  imageUrl: z
    .string()
    .url("Profile picture must be a valid URL") // Or use custom file validation if uploading directly
    .optional(),
  studyField: z.string().min(1, "Course of study is required"),
  yearGraduated: z.union([
    z.number()
    .min(1962, "Year must be 1900 or later")
    .max(new Date().getFullYear(), "Year cannot be in the future"), 
    z.string().transform((val) => Number(val))
  ]),
  bioSummary: z.string().min(1, "Bio summary is required"),
  fullSummary: z.string().optional(), // Allow full summary to be optional
  positionAssigned: z.string(),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});