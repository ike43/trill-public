import { Metadata } from 'next'

import { SaleItemsContainer } from 'features/sale-items'

export default async function Page() {
  return (
    <>
      <SaleItemsContainer />
    </>
  )
}

export const metadata: Metadata = {
  title: '販売中のアイテム',
}
