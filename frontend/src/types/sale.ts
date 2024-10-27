export type SaleType = {
  datetime: string
  datetimeDisplay: boolean
  title: string
  image: string
  category: string
  category_name: string
  price: number
}

export type SalesType = {
  quantity: number
  sales: Array<SaleType>
}

export type SaleHistoryItemType = {
  image: string
  category_name: string
  title: string
  price: number
}

export type SaleHistoryType = Array<{
  datetime: string
  items: Array<SaleHistoryItemType>
}>
