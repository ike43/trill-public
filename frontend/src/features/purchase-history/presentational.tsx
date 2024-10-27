'use client'

import { Box, Center, Flex, VStack } from '@chakra-ui/react'

import AlertList from 'components/Elements/Alert/AlertList'
import ItemList from 'components/Elements/Item/ItemList'
import { MESSAGE_NO_PURCHASE_HISTORY } from 'constants/message'
import { PurchaseType } from 'types/purchase'

export function PurchaseHistoryPresentation({ purchases }: { purchases: PurchaseType[] }) {
  const groupedById = purchases.reduce((acc, purchase) => {
    const group = acc.find((group) => group[0].datetime === purchase.datetime)
    if (group) {
      group.push(purchase)
    } else {
      acc.push([purchase])
    }
    return acc
  }, [] as PurchaseType[][])

  const history = groupedById.map((purchases) => {
    const datetime = purchases[0].datetime
    const total = purchases[0].total
    const items = purchases.map((datetime) => ({
      image: datetime.image,
      category_name: datetime.category_name,
      title: datetime.title,
      price: datetime.price,
    }))
    return {
      datetime,
      total,
      items,
    }
  })

  return (
    <Box w="100%" maxW={600} minH={600} px={8} py={8} borderWidth="1px" borderRadius="lg">
      {purchases.length === 0 ? (
        <AlertList type="info" messages={[MESSAGE_NO_PURCHASE_HISTORY]} />
      ) : (
        <Box>
          <VStack spacing={12} align="left">
            {history.map((history, index) => (
              <VStack spacing={5} align="left" key={index}>
                <Box fontSize={18} fontWeight="bold">
                  {history.datetime}
                </Box>
                <Box>
                  <Flex w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Center py={2} px={20} bg="gray.700" color="white" fontWeight="bold">
                      合計金額
                    </Center>
                    <Center py={2} px={10} flex={1} fontWeight="bold">
                      {history.total.toLocaleString()}円
                    </Center>
                  </Flex>
                </Box>
                <ItemList items={history.items} />
              </VStack>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  )
}
