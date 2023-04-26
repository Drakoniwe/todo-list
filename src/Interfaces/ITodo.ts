import type ICategory from './ICategory'

export default interface ITodo {
  title: string
  id: string
  isCompleted: boolean
  priority: { value: string; label: string }
  category?: ICategory
}

export enum Priority {
  Low = '3',
  Medium = '2',
  High = '1'
}
