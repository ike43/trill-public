'use server'

import { API_ITEM_LIST_GET } from 'constants/api'
import { MESSAGE_ERROR, MESSAGE_NO_RESULT } from 'constants/message'
import { FormStateType } from 'types/form'
import { buildApiUrl } from 'utils/buildApiUrl'

export async function search(state: FormStateType, formData: FormData) {
  try {
    // 検索条件のクエリパタメータを作成
    const params = {
      q: (formData.get('q') as string) || '',
      category: (formData.get('category') as string) || '',
    }
    const query = new URLSearchParams(params)

    // アイテムを検索する
    const response = await fetch(buildApiUrl({ path: API_ITEM_LIST_GET ?? '' }) + `?${query}`)

    if (!response.ok) {
      throw new Error()
    }

    const items = await response.json()

    return {
      success: true,
      messages: items.quantity === 0 ? [MESSAGE_NO_RESULT] : undefined,
      data: items.items ?? [],
    }
  } catch (error) {
    return {
      success: false,
      messages: [MESSAGE_ERROR],
    }
  }
}
