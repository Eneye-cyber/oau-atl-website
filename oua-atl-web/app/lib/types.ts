export interface ErrorResponse {
  message: string;
  error: boolean;
}

export interface PaginatedResponse<T> {
  message: string;
  payload: {
    data: T;
    page: number;
    totalCount: number;
    totalPages: number;
  };
  error?: boolean;
}

type Location = {
  city: string;
  state: string;
  address: string | null;
  latlong: {
    latitude: number; // Replace with actual type if known (e.g., number)
    longitude: number; // Replace with actual type if known (e.g., number)
  };
  place_id: string;
  postal_code: string;
};

export type UserRoleResponse = {
  role: "guest" | "member" | "admin";
  id: string | null;
  message?: string;
}

export type AuthResponse = {
  message: string;
  user: {
    email: string;
    id: string;
    role: "member" | "admin" ; // Explicitly specifying "member" as one possible value, but keeping it open for others
  };
};

export type UserProfile = {
  graduation_year: string;
  field_of_study: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  address: string;
  address2: string | null;
  city: string;
  zip_code: number;
  phone: string;
  birth_date: string; // ISO 8601 format
  hobbies: string[]; // Array of strings
  is_volunteering: boolean;
  verified: boolean;
  membership_expired: boolean;
  email_verified: boolean;
};

export type PaymentResponse = {
  message: string;
  payload?: {
    orderID: string;
    approvalUrl: string;
  };
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export type PostPaymentResponse = {
  message: string;
  payload: {
      reference: string;
  };
  error?: boolean
};

export interface EnquiryCollection {
  email: string;
  closed: boolean;
  message: string;
  subject: string;
  full_name: string;
  contact_id: string;
  created_at: string; // ISO 8601 format date-time string
}

export type ProjectCollection = {
  location: Location;
  image_url: string;
  project_id: string;
  amount_goal: number;
  is_featured: boolean;
  date_created: string; // ISO 8601 date format
  project_text: string;
  project_title: string;
  donation_count: number;
  amount_collected: number;
};

export interface ProjectResponseObject {
  image_url: string;
  project_title: string;
  project_text: string;
  date_created: string; // ISO 8601 date format
  is_featured: boolean;
  deadline: string; // ISO 8601 date format
  donation_count: string; // Represented as a string
  amount_collected: string; // Represented as a string
  amount_goal: string; // Represented as a string
  progress: string; // Represented as a string
  location: {
    city: string;
    state: string;
    address: string | null; // Can be null
    latlong: {
      lat: string; // Latitude as string
      long: string; // Longitude as string
    };
  };
}

export interface ProjectDonationResponse {
  full_name: string;
  project_title: string;
  amount_donating: string; // Using string to match the provided format for the amount
  donated_at: string; // ISO 8601 formatted string for date and time
}

export interface DonationCollection extends ProjectDonationResponse{
  email: string
}



export interface GalleryCollection {
  gallery_id: string; // UUID of the gallery
  gallery_title: string; // Title of the gallery
  created_at: string; // ISO string timestamp of creation
  item_count: number; // Number of items in the gallery
  image_url: string;
};

export interface EventResponseObject {
  tags: string[]; // Array of tags
  title: string; // Event title
  content: string; // Event description/content
  end_date: string; // ISO date string for the end date
  event_id: string; // UUID for the event ID
  location: {
    city: string; // Location city
    state: string; // Location state
    address: string; // Location address
  place_id?: string,
  latlong: {
      lat: number; // Latitude
      long: number; // Longitude
    };
    postal_code: string; // Postal code
  };
  image_url: string; // URL of the event image
  start_date: string; // ISO date string for the start date
  is_featured: boolean; // Whether the event is featured
  entrance_fee: number; // Entrance fee for the event
  tickets?: [],
}

export interface EventCollection {
  tags: string[]; // Array of tags
  title: string; // Event title
  content: string; // Event description/content
  end_date: string; // ISO date string for the end date
  event_id: string; // UUID for the event ID
  location: {
    city: string; // Location city
    state: string; // Location state
    address: string; // Location address
    latlong: {
      lat: number; // Latitude
      long: number; // Longitude
    };
    postal_code: string; // Postal code
  };
  image_url: string; // URL of the event image
  start_date: string; // ISO date string for the start date
  is_featured: boolean; // Whether the event is featured
  entrance_fee: number; // Entrance fee for the event
}

export interface Contact {
  email: string;
  closed: boolean;
  message: string;
  subject: string;
  full_name: string;
  contact_id: string; // UUID
  created_at: string; // ISO 8601 timestamp
}


// Type for the action object
export type Action = {
  href: string;
  label: string;
};

// Type for content items in sections
export type ContentItem = {
  id: number | string;
  label: string | null;
  title: string | null;
  subtitle: string | null;
  text: string | null;
  media: string | null;
  action: Action | null;
  list: string[] | ListItem[] | null;
};

// Type for a single section
export type Section = {
  name: string;
  slug: string;
  type: string;
  header: string | null;
  subheader: string | null;
  content: ContentItem[];
  action: Action | null;
};

// Type for the home page data
export type HomeData = {
  id: number;
  sections: Section[];
  fallback: Section
};

// Type for the props of a component receiving section data
export type SectionDataProps = {
  data: Section;
};


export type Content = {
  id: number | string
  label: string | null
  title: string | null
  subtitle: string | null
  text: string | null
  media: string | null
  action: { href: string; label: string } | null
  list: string[] | ListItem[] | null
}


export type PageData = {
  id: number
  sections: Section[]
  fallback: Section

}

export type JsonData = {
  pages: {
    [key: string]: PageData
  }
}
export interface SiteSchema {
  general: {
    social: PageData;
    header: PageData;
    footer: PageData;
  };
}


export interface ListItem {
  label: string;
  href: string;
  children?: ListItem[]; // Optional children for nested navigation
}

export type PageSchemaResponse = {pageSchema?: JsonData; routeList: string[]; message?: string}

type SchemaResponse = {
  message: string;
};


type ApiResponse = SchemaResponse | ErrorResponse;