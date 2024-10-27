import 'server-only'
import { cookies } from 'next/headers'

import { jwtVerify, SignJWT } from 'jose'

type SessionPayload = {
  userId: string
  cookie: string
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as SessionPayload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

export async function createSession({ userId, cookie }: { userId: string; cookie: string }) {
  const session = await encrypt({ userId, cookie })

  cookies().set('session', session, {
    path: '/',
    httpOnly: true,
    maxAge: 604800,
  })
}

export async function updateSession({ cookie }: { cookie: string }) {
  const session = cookies().get('session')?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    createSession({ userId: '', cookie })
    return
  }

  const updatedSession = await encrypt({ userId: payload.userId, cookie })

  cookies().set('session', updatedSession, {
    path: '/',
    httpOnly: true,
    maxAge: 604800,
  })
}

export function deleteSession() {
  cookies().delete('session')
}
