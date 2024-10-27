import { Box, Center, Container, Flex } from '@chakra-ui/react'

import { APP_NAME } from 'constants/app'
import { FooterContainer } from 'features/footer'
import { HeaderContainer } from 'features/header'

import { Providers } from './providers'

import type { Metadata } from 'next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Flex direction="column" minH="100vh">
            <HeaderContainer />
            <Box flex="1">
              <main>
                <Container maxW="container.xl" my={7}>
                  <Center>{children}</Center>
                </Container>
              </main>
            </Box>
            <FooterContainer />
          </Flex>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    template: '%s | ' + APP_NAME,
    default: APP_NAME,
  },
}
