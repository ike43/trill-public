'use server'

import { API_CART_ITEM_ADD } from 'constants/api'
import { MESSAGE_ERROR } from 'constants/message'
import { verifySession } from 'libs/dal'
import { updateSession } from 'libs/session'
import { FormStateType } from 'types/form'
import { buildApiUrl } from 'utils/buildApiUrl'

export async function addCart(state: FormStateType, formData: FormData) {
  const session = await verifySession()

  try {
    // カートに追加する
    const response = await fetch(buildApiUrl({ path: API_CART_ITEM_ADD ?? '' }), {
      method: 'POST',
      body: formData,
      headers: { Cookie: session?.cookie },
    })

    if (!response.ok) {
      throw new Error()
    }

    // APIから発行されたCookieを取得する
    const setCookieHeaders = response.headers.getSetCookie()
    const sessionCookie = setCookieHeaders.find((cookie) => cookie.startsWith('session='))
    if (!sessionCookie) {
      throw new Error()
    }
    const sessionValue = sessionCookie.split(';')[0].split('session=')[1]
    updateSession({ cookie: sessionValue })

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      messages: [MESSAGE_ERROR ?? ''],
    }
  }
}
