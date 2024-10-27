import { Badge, Box, Flex, Image, VStack } from '@chakra-ui/react'

import { buildImageUrl } from 'utils/buildImageUrl'

type ItemListProps = {
  items: Array<{
    image: string
    category_name: string
    title: string
    price: number
  }>
}

export default function ItemList({ items }: ItemListProps) {
  return (
    <VStack spacing={5} align="left">
      {items.map((item, index) => (
        <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden" key={index}>
          <Flex>
            <Image src={buildImageUrl(item.image)} w="120px" objectFit="cover" alt="" />
            <Box px={4} py={3} flex={1}>
              <Badge bg="gray.700" color="white" fontWeight="normal">
                {item.category_name}
              </Badge>
              <Box my={2} fontWeight="bold">
                {item.title}
              </Box>
              <Box textAlign="right">{item.price.toLocaleString()}円</Box>
            </Box>
          </Flex>
        </Box>
      ))}
    </VStack>
  )
}
