import { createContext, useContext } from 'react'
import miscStore from './miscStore'
import todoStore from './todoStore'

// Main Store hook that let's us access and use different stores

const store = {
  todoStore: todoStore(),
  miscStore: miscStore()
}

export const StoreContext = createContext(store)

export const useStore = (): React.ContextType<typeof StoreContext> => {
  return useContext<typeof store>(StoreContext)
}

export default store
