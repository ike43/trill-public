'use client'

import { useActionState } from 'react'

import { Box, Button, Input } from '@chakra-ui/react'

import AlertList from 'components/Elements/Alert/AlertList'

import { login } from './action'

export function LoginPresentation() {
  const [state, formAction] = useActionState(login, undefined)

  return (
    <Box w="100%" maxW={400} minH={600} px={8} py={8} borderWidth="1px" borderRadius="lg">
      <AlertList type="error" messages={state?.messages} />
      <form action={formAction}>
        <Box>
          <label>
            <Box fontWeight="bold">メールアドレス</Box>
            <Box py={3}>
              <Input name="email" bg="white" />
            </Box>
          </label>
        </Box>
        <Box mt={3}>
          <label>
            <Box fontWeight="bold">パスワード</Box>
            <Box py={3}>
              <Input name="password" bg="white" type="password" />
            </Box>
          </label>
        </Box>
        <Box mt={7}>
          <Button w="100%" colorScheme="orange" type="submit">
            ログイン
          </Button>
        </Box>
      </form>
    </Box>
  )
}
