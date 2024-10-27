'use client'

import { useActionState } from 'react'

import { Badge, Box, Button, Center, Image, Link } from '@chakra-ui/react'

import AlertList from 'components/Elements/Alert/AlertList'
import { ItemType } from 'types/item'
import { buildImageUrl } from 'utils/buildImageUrl'

import { addCart } from './action'

export function ItemPresentation({ item }: { item: ItemType }) {
  const [state, formAction, isPending] = useActionState(addCart, undefined)

  return (
    <Box w="100%" maxW={600} borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Center>
        <Image src={buildImageUrl(item.image)} w="100%" objectFit="cover" alt="" />
      </Center>
      <Box px={8} py={8}>
        <Badge bg="gray.700" color="white" fontWeight="normal">
          {item.category_name}
        </Badge>
        <Box my={2} fontWeight="bold">
          {item.title}
        </Box>
        <Box mb={10} textAlign="right">
          {item.price.toLocaleString()}円
        </Box>
        {item.seller ? (
          <Link href={`/item/edit/${item.id}`}>
            <Button w="100%" mb={5} colorScheme="orange" as="span">
              価格を変更する
            </Button>
          </Link>
        ) : item.purchased ? (
          <Box w="100%" bg="gray.200" py={2} borderRadius="md" textAlign="center" fontWeight="bold">
            購入済み
          </Box>
        ) : item.cart_added || state?.success ? (
          <Box
            w="100%"
            bg="orange.500"
            color="white"
            opacity={0.7}
            py={2}
            borderRadius="md"
            textAlign="center"
            fontWeight="bold"
          >
            カート追加済み
          </Box>
        ) : (
          <>
            <AlertList type="error" messages={state?.messages} />
            <form action={formAction}>
              <input type="hidden" name="id" value={item.id} />
              <Button w="100%" colorScheme="orange" type="submit" isLoading={isPending}>
                カートへ追加
              </Button>
            </form>
          </>
        )}
      </Box>
    </Box>
  )
}
