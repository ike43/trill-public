import Link from 'next/link'

import { Badge, Box, Grid, GridItem, Image } from '@chakra-ui/react'

import { ItemType } from 'types/item'
import { buildImageUrl } from 'utils/buildImageUrl'

type ItemGridProps = {
  items: Array<ItemType>
  linkType?: 'view' | 'edit'
}

export default function ItemGrid({ items, linkType = 'view' }: ItemGridProps) {
  return (
    <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={6}>
      {items.map((item, index) => (
        <GridItem key={index}>
          <Box w="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Link href={linkType === 'edit' ? `/item/edit/${item.id}` : `/item/${item.id}`}>
              <Image src={buildImageUrl(item.image)} cursor="pointer" w="100%" objectFit="cover" alt="" />
            </Link>
            <Box px={4} py={3}>
              <Badge bg="gray.700" color="white" fontWeight="normal">
                {item.category_name}
              </Badge>
              <Box my={2} fontWeight="bold">
                {item.title}
              </Box>
              <Box textAlign="right">{item.price.toLocaleString()}円</Box>
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  )
}
