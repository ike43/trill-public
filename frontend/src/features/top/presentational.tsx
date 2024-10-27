'use client'

import { useActionState, useRef, useState } from 'react'

import { Box, Center, Flex, Input, Radio, RadioGroup, Spinner, VStack } from '@chakra-ui/react'

import { useDebouncedCallback } from 'use-debounce'

import AlertList from 'components/Elements/Alert/AlertList'
import ItemGrid from 'components/Elements/Item/ItemGrid'
import { CategoryType } from 'types/category'
import { ItemType } from 'types/item'

import { search } from './action'

export function TopPresentation({ items, categories }: { items: ItemType[]; categories: CategoryType[] }) {
  const ref = useRef<HTMLFormElement>(null)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('0')
  const [state, formAction, isPending] = useActionState(search, undefined)
  const displayItems = state?.data ?? items

  const debouncedSearch = useDebouncedCallback(() => submit(), 500)

  const handleChangeKeyword = (value: string) => {
    setKeyword(value)
    debouncedSearch()
  }

  const handleChangeCategory = (value: string) => {
    setCategory(value)
    submit()
  }

  const submit = () => {
    if (ref.current) {
      const formData = new FormData(ref.current)
      formAction(formData)
    }
  }

  return (
    <Flex gap={10} width="100%">
      <Box w={280} px={5} py={7} borderRadius="lg" boxShadow="base">
        <form ref={ref}>
          <Box>
            <label>
              <Box fontWeight="bold">検索</Box>
              <Box py={3}>
                <Input bg="white" name="q" value={keyword} onChange={(e) => handleChangeKeyword(e.target.value)} />
              </Box>
            </label>
          </Box>
          <Box py={7}>
            <Box fontWeight="bold">カテゴリ</Box>
            <RadioGroup name="category" value={category} onChange={handleChangeCategory}>
              <VStack py={3} spacing={3} align="left">
                {categories &&
                  categories.map((category, index) => (
                    <Radio colorScheme="gray" value={category.id.toString()} key={index}>
                      {category.name}
                    </Radio>
                  ))}
              </VStack>
            </RadioGroup>
          </Box>
        </form>
      </Box>
      {isPending ? (
        <Center>
          <Spinner color="gray.700" emptyColor="gray.200" size="xl" thickness="5px" />
        </Center>
      ) : (
        <Box flex={1}>
          {state?.messages ? <AlertList type="error" messages={state?.messages} /> : <ItemGrid items={displayItems} />}
        </Box>
      )}
    </Flex>
  )
}
