import { action } from 'mobx'
import { observer } from 'mobx-react'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { useStore } from '../../Store/store'
import CategoryItem from '../CategoryItem/CategoryItem'
import './TodoCategories.scss'

// We create a similar component to TodoList so we could further improve on the categories and not be stuck with a lot of abstractions..
// Separate component alows us to add colors and other features that may want to be implemented later
const TodoCategories: React.FC = () => {
  const [input, setInput] = useState('')

  const {
    miscStore: { categories }
  } = useStore()

  const handleAddCategoryButton = action((): void => {
    categories.push({
      title: input,
      id: nanoid()
    })
    setInput('')
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  const categoryItems = categories.map((item) => (
    <CategoryItem key={item.id} item={item} />
  ))

  return (
    <div className="TodoCategories">
      <div className="TodoCategories-AddCategory">
        <input
          onChange={(e) => {
            handleInputChange(e)
          }}
          value={input}
          placeholder="Category name"
        />
        <button disabled={input === ''} onClick={handleAddCategoryButton}>
          ADD
        </button>
      </div>
      {categoryItems}
    </div>
  )
}
export default observer(TodoCategories)
