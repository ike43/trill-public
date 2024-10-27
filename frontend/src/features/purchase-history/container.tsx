import { API_PURCHASE_HISTORY, API_USERS } from 'constants/api'
import { verifySession } from 'libs/dal'
import { buildApiUrl } from 'utils/buildApiUrl'

import { PurchaseHistoryPresentation } from './presentational'

export async function PurchaseHistoryContainer() {
  const session = await verifySession()

  const response = await fetch(
    buildApiUrl({ path: (API_USERS ?? '') + session?.userId + (API_PURCHASE_HISTORY ?? '') }),
    {
      headers: { Cookie: session?.cookie },
    },
  )
  const history = await response.json()

  return (
    <>
      <PurchaseHistoryPresentation purchases={history.purchases ?? []} />
    </>
  )
}
