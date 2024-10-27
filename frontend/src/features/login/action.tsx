'use server'

import { redirect } from 'next/navigation'

import { API_LOGIN } from 'constants/api'
import { MESSAGE_ERROR, MESSAGE_LOGIN_FAIL } from 'constants/message'
import { createSession } from 'libs/session'
import { FormStateType } from 'types/form'
import { buildApiUrl } from 'utils/buildApiUrl'

export async function login(state: FormStateType, formData: FormData) {
  try {
    // APIで認証する
    const response = await fetch(buildApiUrl({ path: API_LOGIN ?? '' }), {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          messages: [MESSAGE_LOGIN_FAIL ?? ''],
        }
      } else {
        throw new Error()
      }
    }

    // APIから取得したユーザIDを取得する
    const user = await response.json()

    // APIから発行されたCookieを取得する
    const setCookieHeaders = response.headers.getSetCookie()
    const sessionCookie = setCookieHeaders.find((cookie) => cookie.startsWith('session='))
    if (!sessionCookie) {
      throw new Error()
    }
    const sessionValue = sessionCookie.split(';')[0].split('session=')[1]

    // セッションを作成する
    await createSession({ userId: user.id, cookie: sessionValue })
  } catch (error) {
    return {
      success: false,
      messages: [MESSAGE_ERROR ?? ''],
    }
  }

  redirect('/')
}
