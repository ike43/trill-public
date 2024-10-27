import { Alert, AlertIcon, AlertTitle, VStack } from '@chakra-ui/react'

type AlertListProps = {
  type: 'info' | 'error'
  messages: Array<string> | undefined
}

export default function AlertList({ type, messages }: AlertListProps) {
  return (
    <>
      {messages && messages.length !== 0 && (
        <VStack spacing={5} mb={5} align="left">
          {messages?.map((message) => (
            <Alert status={type} borderRadius="md" key={message}>
              <AlertIcon />
              <AlertTitle>{message}</AlertTitle>
            </Alert>
          ))}
        </VStack>
      )}
    </>
  )
}
