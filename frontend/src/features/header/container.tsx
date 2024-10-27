import { cookies } from 'next/headers'

import { HeaderPresentation } from './presentational'

export function HeaderContainer() {
  const loggedIn = Boolean(cookies().get('session'))

  return (
    <>
      <HeaderPresentation loggedIn={loggedIn} />
    </>
  )
}
