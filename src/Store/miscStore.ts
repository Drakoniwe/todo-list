import { type IObservableArray, makeAutoObservable } from 'mobx'
import type ICategory from '../Interfaces/ICategory'

// Store that stores miscellaneous stuff to assist todos array, but is not necessarily needed

const miscStore = (): {
  categories: IObservableArray<ICategory>
} => {
  return makeAutoObservable({
    categories: [] as unknown as IObservableArray<ICategory>
  })
}

export default miscStore
