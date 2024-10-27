'use client'

import { useActionState } from 'react'

import { Box, Button, Link, VStack } from '@chakra-ui/react'

import AlertList from 'components/Elements/Alert/AlertList'

import { logout } from './action'

export function UserMenuPresentation() {
  const [state, formAction] = useActionState(logout, undefined)

  return (
    <Box w="100%" maxW={400} px={8} py={8} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box>
        <Box fontSize={24} fontWeight="bold" borderLeftWidth="5px" borderLeftColor="gray.700" pl={3}>
          販売
        </Box>
        <VStack mt={6} align="left">
          <Link href="/user/sale/items">販売中のアイテム</Link>
          <Link href="/user/sale/history">販売履歴</Link>
        </VStack>
      </Box>
      <Box mt={10} mb={12}>
        <Box fontSize={24} fontWeight="bold" borderLeftWidth="5px" borderLeftColor="gray.700" pl={3}>
          購入
        </Box>
        <VStack mt={6} align="left">
          <Link href="/user/purchase/items">購入済みのアイテム</Link>
          <Link href="/user/purchase/history">購入履歴</Link>
        </VStack>
      </Box>
      <AlertList type="error" messages={state?.messages} />
      <form action={formAction}>
        <Button w="100%" colorScheme="gray" type="submit">
          ログアウト
        </Button>
      </form>
    </Box>
  )
}
