import { Metadata } from 'next'

import { CartContainer } from 'features/cart'

export default async function Page() {
  return (
    <>
      <CartContainer />
    </>
  )
}

export const metadata: Metadata = {
  title: 'カート',
}
