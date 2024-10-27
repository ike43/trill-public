import { API_PURCHASE_ITEMS_GET, API_USERS } from 'constants/api'
import { verifySession } from 'libs/dal'
import { buildApiUrl } from 'utils/buildApiUrl'

import { PurchaseItemsPresentation } from './presentational'

export async function PurchaseItemsContainer() {
  const session = await verifySession()

  const response = await fetch(
    buildApiUrl({ path: (API_USERS ?? '') + session?.userId + (API_PURCHASE_ITEMS_GET ?? '') }),
    {
      headers: { Cookie: session?.cookie },
    },
  )
  const items = await response.json()

  return (
    <>
      <PurchaseItemsPresentation items={items.items ?? []} />
    </>
  )
}
