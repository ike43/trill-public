import { Metadata } from 'next'

import { SellContainer } from 'features/sell'

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <SellContainer itemId={params.id} />
    </>
  )
}

export const metadata: Metadata = {
  title: '販売',
}
