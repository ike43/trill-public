'use server'

import { revalidatePath } from 'next/cache'

import { API_CART_ITEM_DELETE, API_PURCHASE_ITEMS_ADD, API_USERS } from 'constants/api'
import { MESSAGE_ERROR } from 'constants/message'
import { verifySession } from 'libs/dal'
import { updateSession } from 'libs/session'
import { FormStateType } from 'types/form'
import { buildApiUrl } from 'utils/buildApiUrl'

export async function deleteCart(state: FormStateType, formData: FormData) {
  const session = await verifySession()

  try {
    // カートからアイテムを削除する
    const response = await fetch(buildApiUrl({ path: (API_CART_ITEM_DELETE ?? '') + formData.get('id') || '' }), {
      method: 'DELETE',
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

    // 再レンダリングする
    revalidatePath('/cart')

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message: MESSAGE_ERROR ?? '',
    }
  }
}

export async function purchase(state: FormStateType, formData: FormData) {
  const session = await verifySession()

  try {
    // カートのアイテムを購入する
    const response = await fetch(
      buildApiUrl({ path: (API_USERS ?? '') + session?.userId + (API_PURCHASE_ITEMS_ADD ?? '') }),
      {
        method: 'POST',
        headers: { Cookie: session?.cookie },
      },
    )

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

    // 再レンダリングする
    revalidatePath('/cart')

    return {
      success: true,
    }
  } catch (error) {
    return {
      success: false,
      message: MESSAGE_ERROR ?? '',
    }
  }
}
