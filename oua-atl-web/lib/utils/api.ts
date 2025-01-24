'use server'
import { PostPaymentResponse } from '@/app/lib/types';
import { cookies } from 'next/headers'
const baseUrl = process.env.API_BASE;
const appUrl = process.env.APP_URL;

export async function fetchData(path: string, cache: RequestCache = 'no-store' ) {
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  const url = `${baseUrl}/${normalizedPath}`;
  const cookieStore = cookies();
  const incomingCookies = cookieStore.getAll().map(cookie => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: incomingCookies,
      },
      credentials: 'include', // Include cookies
      cache: cache, // Force no caching for fresh data
    });

    // Check if the response is okay (status 2xx)
    if (!res.ok) {
      // Handle non-successful HTTP statuses
      const errorMessage = `Error: ${res.status} ${res.statusText}`;
      throw new Error(errorMessage);
    }

    // Attempt to parse the JSON
    const data = await res.json();
    return data;

  } catch (error: any) {
    // Log or handle the error
    console.error("Failed to fetch stats:", error);
    return { message: error?.message ?? 'Failed to fetch data', error: true}
  }
}

export async function fetchPageSchema(slug: string, cache: RequestCache = 'default' ) {
  const url = `${appUrl}/api/schema?slug=${slug}`;
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies
      cache: cache, // Force no caching for fresh data
    });

    // Check if the response is okay (status 2xx)
    if (!res.ok) {
      // Handle non-successful HTTP statuses
      const errorMessage = `Error: ${res.status} ${res.statusText}`;
      throw new Error(errorMessage);
    }

    // Attempt to parse the JSON
    const data = await res.json();
    if(data.message && !data.pageSchema) {
      throw new Error(data.message);
    }

    return data;

  } catch (error: any) {
    // Log or handle the error
    console.error("Failed to fetch stats:", error);
    return { message: error?.message ?? 'Failed to fetch data', error: true}
  }
}

export async function fetchRouteList(cache: RequestCache = 'default' ) {
  const url = `${appUrl}/api/routes`;
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies
      cache: cache, // Force no caching for fresh data
    });

    // Check if the response is okay (status 2xx)
    if (!res.ok) {
      // Handle non-successful HTTP statuses
      const errorMessage = `Error: ${res.status} ${res.statusText}`;
      throw new Error(errorMessage);
    }

    // Attempt to parse the JSON
    const data = await res.json();
    return data;

  } catch (error: any) {
    // Log or handle the error
    console.error("Failed to fetch stats:", error);
    return { message: error?.message ?? 'Failed to fetch data', data: [], error: true}
  }
}


export const capturePayment = async ( trxref: string, reference: string): Promise<PostPaymentResponse> => {
  const cookieStore = cookies();
  const incomingCookies = cookieStore.getAll().map(cookie => `${cookie.name}=${encodeURIComponent(cookie.value)}`).join('; ');

  try {
    const url = `${baseUrl}/payments/capture?trxref=${trxref}&reference=${reference}`
    const res: Response = await fetch(url, 
      {
        method: 'POST',
        headers: {
          Cookie: incomingCookies
        },
        credentials: "include"
      }
    )

    if(res.ok) {
      const result: PostPaymentResponse = await res.json()
      return result
    }
    
    throw new Error(res.statusText)
  } catch (error: unknown) {
    if(error instanceof Error) {
      return { message: error.message, payload: { reference: reference }, error: true}
    }
    return { message: 'Something went wrong', payload: { reference: reference }, error: true}
  }
}


export const logout = async (userId: string, baseUrl: string, cookies?: any): Promise<boolean> => {
  try {
    const response = await fetch(`${baseUrl}/admins/${userId}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies
      },
    });

    if (response.ok) {
      console.log('Logout successful');
      return true;
    } else {
      console.error(`Logout failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
  return false;
};