'use server'

import { redirect } from 'next/navigation'

import { API_ITEM_UPDATE } from 'constants/api'
import { MESSAGE_ERROR } from 'constants/message'
import { verifySession } from 'libs/dal'
import { FormStateType } from 'types/form'
import { buildApiUrl } from 'utils/buildApiUrl'

export async function editItem(state: FormStateType, formData: FormData) {
  const session = await verifySession()

  try {
    // 価格を変更する
    const response = await fetch(buildApiUrl({ path: (API_ITEM_UPDATE ?? '') + formData.get('id') || '' }), {
      method: 'PUT',
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
  } catch (error) {
    return {
      success: false,
      messages: [MESSAGE_ERROR ?? ''],
    }
  }

  redirect(`/item/${formData.get('id')}`)
}
