import { Metadata } from 'next'

import { ItemEditContainer } from 'features/item-edit'

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <ItemEditContainer itemId={params.id} />
    </>
  )
}

export const metadata: Metadata = {
  title: 'アイテム編集',
}
