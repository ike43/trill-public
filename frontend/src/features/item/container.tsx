import { API_ITEM_GET } from 'constants/api'
import { verifySession } from 'libs/dal'
import { buildApiUrl } from 'utils/buildApiUrl'

import { ItemPresentation } from './presentational'

export async function ItemContainer({ itemId }: { itemId: string }) {
  const session = await verifySession()

  const response = await fetch(buildApiUrl({ path: (API_ITEM_GET ?? '') + itemId }), {
    headers: { Cookie: session?.cookie },
  })
  const item = await response.json()

  return (
    <>
      <ItemPresentation item={item} />
    </>
  )
}
