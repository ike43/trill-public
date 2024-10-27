'use client'

import { Box, Button, Center, Container, Flex, Link, Spacer } from '@chakra-ui/react'

import { IconContext } from 'react-icons'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { FiShoppingCart, FiUser } from 'react-icons/fi'

import { APP_NAME } from 'constants/app'

export function HeaderPresentation({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header>
      <Box bg="gray.700" color="white">
        <Container py={4} maxW="container.xl">
          <Flex>
            <Link href="/">
              <Flex cursor="pointer">
                <Center fontSize={28} fontWeight="bold" color="white">
                  <h1>{APP_NAME}</h1>
                </Center>
              </Flex>
            </Link>
            <Spacer />
            <Center>
              <nav>
                <Flex>
                  {!loggedIn && (
                    <Center mx={2}>
                      <Link href="/login">
                        <Button colorScheme="white" variant="outline" as="span">
                          ログイン
                        </Button>
                      </Link>
                    </Center>
                  )}
                  {loggedIn && (
                    <Center mx={2}>
                      <Link href="/sell">
                        <Box cursor="pointer" p={1}>
                          <IconContext.Provider value={{ size: '28px', color: 'white' }}>
                            <AiOutlineAppstoreAdd />
                          </IconContext.Provider>
                        </Box>
                      </Link>
                    </Center>
                  )}
                  <Center mx={2}>
                    <Link href="/cart">
                      <Box cursor="pointer" p={1}>
                        <IconContext.Provider value={{ size: '28px', color: 'white' }}>
                          <FiShoppingCart />
                        </IconContext.Provider>
                      </Box>
                    </Link>
                  </Center>
                  {loggedIn && (
                    <Center mx={2}>
                      <Link href="/user">
                        <Box cursor="pointer" p={1}>
                          <IconContext.Provider value={{ size: '28px', color: 'white' }}>
                            <FiUser />
                          </IconContext.Provider>
                        </Box>
                      </Link>
                    </Center>
                  )}
                </Flex>
              </nav>
            </Center>
          </Flex>
        </Container>
      </Box>
    </header>
  )
}
