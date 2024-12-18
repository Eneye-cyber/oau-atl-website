export interface ErrorResponse {
  message: string;
  error: boolean;
}

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

export interface GalleryResponseObjects {
  gallery_id: string; // UUID of the gallery
  gallery_title: string; // Title of the gallery
  created_at: string; // ISO string timestamp of creation
  item_count: number; // Number of items in the gallery
};