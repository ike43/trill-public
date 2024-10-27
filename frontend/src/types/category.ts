export type CategoryType = {
  id: number
  name: string
}

export type CategoriesType = {
  quantity: number
  categories: Array<CategoryType>
}
