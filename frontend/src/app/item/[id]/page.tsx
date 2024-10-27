import { Metadata } from 'next'

import { ItemContainer } from 'features/item'

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <ItemContainer itemId={params.id} />
    </>
  )
}

export const metadata: Metadata = {
  title: 'アイテム',
}
