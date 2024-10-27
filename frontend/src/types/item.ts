export type ItemType = {
  id: number
  title: string
  image: string
  category: string
  category_name: string
  price: number
  creator: number
  seller: boolean
  purchased: boolean
  cart_added: boolean
}

export type ItemsType = {
  quantity: number
  items: Array<ItemType>
}
