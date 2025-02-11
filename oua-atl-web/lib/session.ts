import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { SessionPayload } from '@/app/lib/types'


const secretKey = process.env.SESSION_SECRET
if (!secretKey) throw new Error('SESSION_SECRET is not defined')
const encodedKey = new TextEncoder().encode(secretKey)

/**
 * Extracts the Expires header from a cookie string.
 */
export const getSessionExpiry = (cookieString?: string | null): string  => {
  const d =  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  if (!cookieString) return d
  const parts = cookieString.split(';').map(part => part.trim())
  const expiresString = parts.find(part => part.toLowerCase().startsWith('expires='))
  return expiresString ? expiresString.split('=')[1] : d
}


/**
 * Retrieves the authentication cookie from the headers.
 *  
 * @returns string
 * 
 * */
export const getAuthCookieString = () : string => {
  const cookieStore = cookies();
  const connectCookie = cookieStore.get('connect.sid');
  if(!connectCookie) return ''
  const connectCookieValue = connectCookie ? connectCookie.value : '';
  const authCookie = `${connectCookie.name}=${encodeURIComponent(connectCookieValue)}`;
  return authCookie
}


/**
 * Encrypts the session payload into a JWT token.
 */
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

/**
 * Decrypts the JWT token and returns the session payload.
 */
export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as SessionPayload
  } catch (error) {
    return null
  }
}

/**
 * Creates and stores a session cookie.
 */
export async function createSession(userId: string, userRole: string, userEmail: string, expires: string) {
  const expiresAt = new Date(expires).toISOString()
  const session = await encrypt({ userId, userRole, userEmail, expiresAt })
  const cookieStore = cookies()
  cookieStore.set('atl_session', session, {
    httpOnly: true,
    secure: true,
    expires: new Date(expiresAt),
    sameSite: 'lax',
    path: '/',
  })
}

export const getAuthSession = (): string | undefined  => {
  const cookieStore = cookies()
  const session = cookieStore.get('atl_session')?.value
  return session
}

export async function deleteSession() {
  const cookieStore = cookies()
  cookieStore.delete('atl_session')
  cookieStore.delete('connect.sid'); // Clear auth token or session cookie
  cookieStore.delete('x-custom-id')
  cookieStore.delete('x-custom-role')
}