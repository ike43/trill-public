import { Metadata } from 'next'

import { PurchaseItemsContainer } from 'features/purchase-items'

export default async function Page() {
  return (
    <>
      <PurchaseItemsContainer />
    </>
  )
}

export const metadata: Metadata = {
  title: '購入済みのアイテム',
}
