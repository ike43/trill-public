import { API_SALE_HISTORY, API_USERS } from 'constants/api'
import { verifySession } from 'libs/dal'
import { buildApiUrl } from 'utils/buildApiUrl'

import { SaleHistoryPresentation } from './presentational'

export async function SaleHistoryContainer() {
  const session = await verifySession()

  const response = await fetch(buildApiUrl({ path: (API_USERS ?? '') + session?.userId + (API_SALE_HISTORY ?? '') }), {
    headers: { Cookie: session?.cookie },
  })
  const history = await response.json()

  return (
    <>
      <SaleHistoryPresentation sales={history.sales ?? []} />
    </>
  )
}
