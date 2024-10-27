import { API_CATEGORY_LIST_GET, API_ITEM_GET } from 'constants/api'
import { buildApiUrl } from 'utils/buildApiUrl'

import { ItemEditPresentation } from './presentational'

export async function ItemEditContainer({ itemId }: { itemId: string }) {
  const response = await fetch(buildApiUrl({ path: (API_ITEM_GET ?? '') + itemId }))
  const item = await response.json()

  const responseCategories = await fetch(buildApiUrl({ path: API_CATEGORY_LIST_GET ?? '' }))
  const categories = await responseCategories.json()

  return (
    <>
      <ItemEditPresentation item={item} categories={categories.categories} />
    </>
  )
}
