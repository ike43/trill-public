export type PurchaseType = {
  id: number
  datetime: string
  datetimeDisplay: boolean
  total: number
  title: string
  image: string
  category: string
  category_name: string
  price: number
}

export type PurchasesType = {
  quantity: number
  purchases: Array<PurchaseType>
}

export type PurchaseHistoryItemType = {
  image: string
  category_name: string
  title: string
  price: number
}

export type PurchaseHistoryType = Array<{
  datetime: string
  total: number
  items: Array<PurchaseHistoryItemType>
}>
