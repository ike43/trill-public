'use client'

import { Box, Center, Container, Flex, Link, VStack } from '@chakra-ui/react'

import { APP_NAME } from 'constants/app'

export function FooterPresentation() {
  return (
    <footer>
      <Box bg="gray.100">
        <Container py={10} maxW="container.xl">
          <Flex>
            <Center fontSize={28} fontWeight="bold">
              {APP_NAME}
            </Center>
          </Flex>
          <nav>
            <VStack align="left" mt={7}>
              <Link href="">Trillについて</Link>
              <Link href="">出品の流れ</Link>
              <Link href="">購入の流れ</Link>
              <Link href="">特定商取引法に基づく表示</Link>
              <Link href="">運営会社</Link>
            </VStack>
          </nav>
        </Container>
      </Box>
    </footer>
  )
}
