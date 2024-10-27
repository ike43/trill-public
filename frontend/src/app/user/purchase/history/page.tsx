import { Metadata } from 'next'

import { PurchaseHistoryContainer } from 'features/purchase-history'

export default async function Page() {
  return (
    <>
      <PurchaseHistoryContainer />
    </>
  )
}

export const metadata: Metadata = {
  title: '購入履歴',
}
