import { API_SALE_ITEMS, API_USERS } from 'constants/api'
import { verifySession } from 'libs/dal'
import { buildApiUrl } from 'utils/buildApiUrl'

import { SaleItemsPresentation } from './presentational'

export async function SaleItemsContainer() {
  const session = await verifySession()

  const response = await fetch(buildApiUrl({ path: (API_USERS ?? '') + session?.userId + (API_SALE_ITEMS ?? '') }), {
    headers: { Cookie: session?.cookie },
  })
  const items = await response.json()

  return (
    <>
      <SaleItemsPresentation items={items.items ?? []} />
    </>
  )
}
