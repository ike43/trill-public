import { ItemType } from './item'

export type FormStateType =
  | {
      success?: boolean
      messages?: string[]
    }
  | undefined

export type SearchFormStateType = FormStateType & {
  data?: ItemType[]
}
