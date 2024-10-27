import { Metadata } from 'next'

import { LoginContainer } from 'features/login'

export default async function Page() {
  return (
    <>
      <LoginContainer />
    </>
  )
}

export const metadata: Metadata = {
  title: 'ログイン',
}
