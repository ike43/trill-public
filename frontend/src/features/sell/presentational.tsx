'use client'

import { useActionState, useRef, useState } from 'react'

import { Box, Button, Center, Flex, Input, NumberInput, NumberInputField, Select } from '@chakra-ui/react'

import AlertList from 'components/Elements/Alert/AlertList'
import { CategoryType } from 'types/category'
import { FormStateType } from 'types/form'

import { sell } from './action'

export function SellPresentation({ categories }: { categories: CategoryType[] }) {
  const [state, formAction, isPending] = useActionState<FormStateType, FormData>(sell, undefined)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [filename, setFilename] = useState('')

  return (
    <Box w="100%" maxW={600} minH={600} px={8} py={8} borderWidth="1px" borderRadius="lg">
      <AlertList type="error" messages={state?.messages} />
      <form action={formAction}>
        <Box>
          <label>
            <Box fontWeight="bold">画像ファイル</Box>
            <Box py={3}>
              <input
                ref={fileInputRef}
                type="file"
                id="file"
                name="image"
                accept=".jpg,.jpeg,.png,.gif"
                hidden
                onChange={() => {
                  const file = fileInputRef.current?.files?.[0]
                  setFilename(file?.name ?? '')
                }}
              />
              <Flex alignItems="center">
                <Button
                  colorScheme="gray"
                  variant="outline"
                  onClick={() => {
                    fileInputRef.current?.click()
                  }}
                >
                  選択
                </Button>
                <Box ml={5}>{filename}</Box>
              </Flex>
            </Box>
          </label>
        </Box>
        <Box mt={5}>
          <label>
            <Box fontWeight="bold">カテゴリ</Box>
            <Box py={3}>
              <Select name="category" defaultValue={0}>
                <option value={0} disabled>
                  選択してください
                </option>
                {categories &&
                  categories.map(
                    (category, index) =>
                      category.id !== 0 && (
                        <option value={category.id.toString()} key={index}>
                          {category.name}
                        </option>
                      ),
                  )}
              </Select>
            </Box>
          </label>
        </Box>
        <Box mt={3}>
          <label>
            <Box fontWeight="bold">タイトル</Box>
            <Box py={3}>
              <Input bg="white" name="title" />
            </Box>
          </label>
        </Box>
        <Box mt={3}>
          <label>
            <Box fontWeight="bold">価格</Box>
            <Box py={3} w="100%">
              <Flex w="100%">
                <NumberInput name="price" min={0}>
                  <NumberInputField />
                </NumberInput>
                <Center ml={2}>円</Center>
              </Flex>
            </Box>
          </label>
        </Box>
        <Box mt={7}>
          <Button
            w="100%"
            colorScheme="orange"
            type="submit"
            onClick={() => {
              setFilename('')
            }}
          >
            出品する
          </Button>
        </Box>
      </form>
    </Box>
  )
}
