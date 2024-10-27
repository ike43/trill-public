import { API_CATEGORY_LIST_GET } from 'constants/api'
import { buildApiUrl } from 'utils/buildApiUrl'

import { SellPresentation } from './presentational'

export async function SellContainer({ itemId }: { itemId: string }) {
  const responseCategories = await fetch(buildApiUrl({ path: API_CATEGORY_LIST_GET ?? '' }))
  const categories = await responseCategories.json()

  return (
    <>
      <SellPresentation categories={categories.categories} />
    </>
  )
}
