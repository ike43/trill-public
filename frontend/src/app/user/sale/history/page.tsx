import { Metadata } from 'next'

import { SaleHistoryContainer } from 'features/sale-history'

export default async function Page() {
  return (
    <>
      <SaleHistoryContainer />
    </>
  )
}

export const metadata: Metadata = {
  title: '販売履歴',
}
