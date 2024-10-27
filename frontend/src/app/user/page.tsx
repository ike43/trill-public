import { Metadata } from 'next'

import { UserMenuContainer } from 'features/user-menu'

export default async function Page() {
  return (
    <>
      <UserMenuContainer />
    </>
  )
}

export const metadata: Metadata = {
  title: 'マイページ',
}
