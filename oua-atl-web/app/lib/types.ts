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
  role: string | null;
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
