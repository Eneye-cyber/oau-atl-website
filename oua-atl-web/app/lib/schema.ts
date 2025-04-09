import { z } from 'zod'

const passwordSchema = z.string().min(8, { message: 'Password must be at least 8 characters long' });
// Basic phone number regex (simple version, can be improved)
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format, commonly used in APIs

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
    id: z.string(),
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


export const ticketSchema = z.object({
  quantityAvailable: z.coerce.number().positive("Quantity must be positive"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  startsAt: z.date(),
  expiresAt: z.date(),
  email: z.string().email("Invalid email address"),
  title: z.string().min(1, "Title is required"),
  RSVPContact: z.array(
    z.string().refine((val) => {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      const isPhone = phoneRegex.test(val);
      return isEmail || isPhone;
    }, {
      message: "Must be a valid email or phone number",
    })
  ),
});

export const locationSchema = z.object({
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.string(),
})

export const CreateEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  startDate: z.date(),
  endDate: z.date(),
  entranceFee: z.coerce.number().nonnegative("Fee must be non-negative"),
  tags: z.array(z.string()),
  isFeatured: z.boolean().default(false),
  imageUrl: z.string().url("Must be a valid URL"),
  locationData: locationSchema,
  ticketData: z
    .array(ticketSchema)
    .min(1, "At least one ticket type is required"),
}).superRefine((val, ctx) => {
  const { startDate, endDate } = val; // Access parent to get startDate value
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End date must be later than start date',
      path: ['endDate'],
    })// endDate must be later than startDate
  }
});

export const EditEventSchema = z.object({
  title: z.string().min(1, 'Event name is required'),
  imageUrl: z.string().url("Invalid image URL"),
  startDate: z.date(),
  endDate: z.date(),
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
  entranceFee: z.coerce.number().nonnegative("Fee must be non-negative"),
  isFeatured: z.boolean(),
  locationData: locationSchema,
  ticketData: z
    .array(ticketSchema)
    .min(1, "At least one ticket type is required"),
}).superRefine((val, ctx) => {
  const { startDate, endDate } = val; // Access parent to get startDate value
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End date must be later than start date',
      path: ['endDate'],
    })// endDate must be later than startDate
  }
});

export const CreateProjectSchema = z.object({
  projectTitle: z.string().min(1, "Project title is required"),
  projectText: z.string().min(1, "Project description is required"),
  amountGoal: z.coerce.number().nonnegative("Amount must be non-negative"), // Ensure it's non-negative
  imageURL: z.string().url("Invalid image URL"),
  isFeatured: z.boolean(),
  deadline: z.date(),
  locationData: locationSchema,
});

export const EditProjectSchema = CreateProjectSchema;

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