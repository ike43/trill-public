'use server'

import { redirect } from 'next/navigation'

import { API_LOGOUT } from 'constants/api'
import { MESSAGE_ERROR, MESSAGE_LOGOUT_FAIL } from 'constants/message'
import { verifySession } from 'libs/dal'
import { deleteSession } from 'libs/session'
import { FormStateType } from 'types/form'
import { buildApiUrl } from 'utils/buildApiUrl'

export async function logout(state: FormStateType, formData: FormData) {
  const session = await verifySession()

  try {
    // ログアウトする
    const response = await fetch(buildApiUrl({ path: API_LOGOUT ?? '' }), {
      method: 'POST',
      headers: { Cookie: session?.cookie },
    })

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          messages: [MESSAGE_LOGOUT_FAIL ?? ''],
        }
      } else {
        throw new Error()
      }
    }

    // セッションを削除する
    deleteSession()
  } catch (error) {
    return {
      success: false,
      messages: [MESSAGE_ERROR ?? ''],
    }
  }

  redirect('/')
}
