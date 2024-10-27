'use client'

import { useActionState } from 'react'

import { Box, Button, Center, Flex, Image, Input, NumberInput, NumberInputField, Select } from '@chakra-ui/react'

import AlertList from 'components/Elements/Alert/AlertList'
import { CategoryType } from 'types/category'
import { FormStateType } from 'types/form'
import { ItemType } from 'types/item'
import { buildImageUrl } from 'utils/buildImageUrl'

import { editItem } from './action'

export function ItemEditPresentation({ item, categories }: { item: ItemType; categories: CategoryType[] }) {
  const [state, formAction, isPending] = useActionState<FormStateType, FormData>(editItem, undefined)

  return (
    <Box w="100%" maxW={600} minH={600} px={8} py={8} borderWidth="1px" borderRadius="lg">
      <AlertList type="error" messages={state?.messages} />
      <form action={formAction}>
        <Box>
          <label>
            <Box fontWeight="bold">画像ファイル</Box>
            <Box py={3}>
              <Image src={buildImageUrl(item.image)} w="100%" objectFit="cover" alt="" />
            </Box>
          </label>
        </Box>
        <Box mt={5}>
          <label>
            <Box fontWeight="bold">カテゴリ</Box>
            <Box py={3}>
              <Select bg="gray.200" value={item.category} isDisabled>
                {categories &&
                  categories.map((category, index) => (
                    <option value={category.id} key={index}>
                      {category.name}
                    </option>
                  ))}
              </Select>
            </Box>
          </label>
        </Box>
        <Box mt={3}>
          <label>
            <Box fontWeight="bold">タイトル</Box>
            <Box py={3}>
              <Input bg="gray.200" value={item.title} isDisabled />
            </Box>
          </label>
        </Box>
        <Box mt={3}>
          <label>
            <Box fontWeight="bold">価格</Box>
            <Box py={3} w="100%">
              <Flex w="100%">
                <NumberInput name="price" defaultValue={item.price.toLocaleString()} min={0}>
                  <NumberInputField />
                </NumberInput>
                <Center ml={2}>円</Center>
              </Flex>
            </Box>
          </label>
        </Box>
        <input type="hidden" name="id" value={item.id} />
        <Box mt={7}>
          <Button w="100%" colorScheme="orange" type="submit" isLoading={isPending}>
            変更
          </Button>
        </Box>
      </form>
    </Box>
  )
}
