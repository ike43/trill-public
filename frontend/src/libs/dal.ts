import 'server-only'

import { cookies } from 'next/headers'

import { decrypt } from 'libs/session'

export const verifySession = async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  const isAuth = session?.userId !== ''

  return {
    isAuth,
    userId: session?.userId,
    cookie: 'session=' + decodeURIComponent(session?.cookie ?? ''),
  }
}
