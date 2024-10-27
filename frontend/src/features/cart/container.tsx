import { API_CART_ITEM_GET } from 'constants/api'
import { verifySession } from 'libs/dal'
import { ItemType } from 'types/item'
import { buildApiUrl } from 'utils/buildApiUrl'

import { CartPresentation } from './presentational'

export async function CartContainer() {
  const session = await verifySession()

  const response = await fetch(buildApiUrl({ path: API_CART_ITEM_GET ?? '' }), {
    headers: { Cookie: session?.cookie },
  })
  const items = await response.json()
  const total = items.items ? items.items.reduce((sum: number, item: ItemType) => sum + item.price, 0) : 0

  return (
    <>
      <CartPresentation items={items.items ?? []} total={total} isAuth={session.isAuth} />
    </>
  )
}
