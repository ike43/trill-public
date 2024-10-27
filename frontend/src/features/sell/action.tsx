'use server'

import { redirect } from 'next/navigation'

import { API_ITEM_ADD } from 'constants/api'
import { MESSAGE_ERROR } from 'constants/message'
import { verifySession } from 'libs/dal'
import { FormStateType } from 'types/form'
import { buildApiUrl } from 'utils/buildApiUrl'

export async function sell(state: FormStateType, formData: FormData) {
  const session = await verifySession()
  let id = ''

  try {
    // アイテムを販売する
    const response = await fetch(buildApiUrl({ path: API_ITEM_ADD ?? '' }), {
      method: 'POST',
      body: formData,
      headers: { Cookie: session?.cookie },
    })

    if (!response.ok) {
      if (response.status === 400) {
        const data = await response.json()
        return {
          success: false,
          messages: data.messages ?? '',
        }
      } else {
        throw new Error()
      }
    }

    id = await response.json()
  } catch (error) {
    return {
      success: false,
      messages: [MESSAGE_ERROR ?? ''],
    }
  }

  redirect(`/item/${id}`)
}
