import { API_CATEGORY_LIST_GET, API_ITEM_LIST_GET } from 'constants/api'
import { buildApiUrl } from 'utils/buildApiUrl'

import { TopPresentation } from './presentational'

export async function TopContainer() {
  const response = await fetch(buildApiUrl({ path: API_ITEM_LIST_GET ?? '' }))
  const items = await response.json()

  const responseCategories = await fetch(buildApiUrl({ path: API_CATEGORY_LIST_GET ?? '' }))
  const categories = await responseCategories.json()

  return (
    <>
      <TopPresentation items={items.items} categories={categories.categories} />
    </>
  )
}
