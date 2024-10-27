'use client'

import { useActionState } from 'react'

import { Badge, Box, Button, Center, Flex, Image, Link, VStack } from '@chakra-ui/react'

import { IconContext } from 'react-icons'
import { AiOutlineMinusCircle } from 'react-icons/ai'

import AlertList from 'components/Elements/Alert/AlertList'
import { MESSAGE_NO_CART, MESSAGE_PURCHASE_COMPLETED } from 'constants/message'
import { ItemType } from 'types/item'
import { buildImageUrl } from 'utils/buildImageUrl'

import { deleteCart, purchase } from './action'

export function CartPresentation({ items, total, isAuth }: { items: ItemType[]; total: number; isAuth: boolean }) {
  const [deleteCartState, deleteCartAction] = useActionState(deleteCart, undefined)
  const [purchaseState, purchaseAction] = useActionState(purchase, undefined)

  return (
    <Box w="100%" maxW={600} minH={600} px={8} py={8} borderWidth="1px" borderRadius="lg">
      {items.length === 0 ? (
        <AlertList type="info" messages={[purchaseState ? MESSAGE_PURCHASE_COMPLETED : MESSAGE_NO_CART]} />
      ) : (
        <Box>
          <Box>
            <Flex w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Center py={5} px={20} bg="gray.700" color="white" fontSize={22} fontWeight="bold">
                合計金額
              </Center>
              <Center py={5} px={10} flex={1} fontSize={22} fontWeight="bold">
                {total.toLocaleString()}円
              </Center>
            </Flex>
          </Box>
          <Box mt={10}>
            <VStack spacing={5}>
              {items.map((item, index) => (
                <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" key={index}>
                  <Flex>
                    <Link href={`/item/${item.id}`}>
                      <Image src={buildImageUrl(item.image)} cursor="pointer" w="120px" objectFit="cover" alt="" />
                    </Link>
                    <Box px={6} py={3} flex={1}>
                      <Badge bg="gray.700" color="white" fontWeight="normal">
                        {item.category_name}
                      </Badge>
                      <Box my={2} fontWeight="bold">
                        {item.title}
                      </Box>
                      <Box textAlign="right">{item.price.toLocaleString()}円</Box>
                    </Box>
                    <Center w={100}>
                      <form action={deleteCartAction}>
                        <input type="hidden" name="id" value={item.id} />
                        <Button variant="link" type="submit">
                          <IconContext.Provider value={{ size: '28px', color: 'orange' }}>
                            <AiOutlineMinusCircle />
                          </IconContext.Provider>
                        </Button>
                      </form>
                    </Center>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </Box>
          <Box mt={5}>
            {isAuth ? (
              <form action={purchaseAction}>
                <Button type="submit" colorScheme="orange" w="100%">
                  購入手続きへ進む
                </Button>
              </form>
            ) : (
              <Link href="/login?return=/cart">
                <Button colorScheme="orange" w="100%" as="span">
                  ログインして購入手続きへ進む
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
