'use client'

import { Box } from '@chakra-ui/react'

import AlertList from 'components/Elements/Alert/AlertList'
import ItemGrid from 'components/Elements/Item/ItemGrid'
import { MESSAGE_NO_SALE_ITEM } from 'constants/message'
import { ItemType } from 'types/item'

export function SaleItemsPresentation({ items }: { items: ItemType[] }) {
  return (
    <Box w="100%" minH={600}>
      {items.length === 0 ? (
        <AlertList type="info" messages={[MESSAGE_NO_SALE_ITEM]} />
      ) : (
        <ItemGrid items={items} linkType="edit" />
      )}
    </Box>
  )
}
