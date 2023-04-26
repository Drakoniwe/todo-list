import { type IObservableArray, makeAutoObservable } from 'mobx'
import type ITodo from '../Interfaces/ITodo'

// Store that stores todos in an array

const todoStore = (): { todoList: IObservableArray<ITodo> } => {
  return makeAutoObservable({
    todoList: [] as unknown as IObservableArray<ITodo>
  })
}

export default todoStore
