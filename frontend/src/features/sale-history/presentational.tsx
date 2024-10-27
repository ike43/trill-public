'use client'

import { Box, Center, Flex, VStack } from '@chakra-ui/react'

import AlertList from 'components/Elements/Alert/AlertList'
import ItemList from 'components/Elements/Item/ItemList'
import { MESSAGE_NO_SALE_HISTORY } from 'constants/message'
import { SaleType } from 'types/sale'

export function SaleHistoryPresentation({ sales }: { sales: SaleType[] }) {
  const groupedById = sales.reduce((acc, sale) => {
    const group = acc.find((group) => group[0].datetime === sale.datetime)
    if (group) {
      group.push(sale)
    } else {
      acc.push([sale])
    }
    return acc
  }, [] as SaleType[][])

  const history = groupedById.map((sales) => {
    const datetime = sales[0].datetime
    const items = sales.map((sale) => ({
      image: sale.image,
      category_name: sale.category_name,
      title: sale.title,
      price: sale.price,
    }))
    return {
      datetime,
      items,
    }
  })

  const total = sales.reduce((sum, sale) => sum + sale.price, 0)

  return (
    <Box w="100%" maxW={600} minH={600} px={8} py={8} borderWidth="1px" borderRadius="lg">
      {sales.length === 0 ? (
        <AlertList type="info" messages={[MESSAGE_NO_SALE_HISTORY]} />
      ) : (
        <Box>
          <Box>
            <Flex w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Center py={5} px={20} bg="gray.700" color="white" fontSize={22} fontWeight="bold">
                販売累計金額
              </Center>
              <Center py={5} px={10} flex={1} fontSize={22} fontWeight="bold">
                {total.toLocaleString()}円
              </Center>
            </Flex>
          </Box>
          <Box mt={5}>
            <VStack spacing={12} align="left">
              {history.map((history, index) => (
                <VStack spacing={5} align="left" key={index}>
                  <Box fontSize={18} fontWeight="bold">
                    {history.datetime}
                  </Box>
                  <ItemList items={history.items} />
                </VStack>
              ))}
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  )
}
