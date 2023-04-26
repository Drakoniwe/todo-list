import { action } from 'mobx'
import React, { useState } from 'react'
import type ICategory from '../../Interfaces/ICategory'
import { useStore } from '../../Store/store'

interface CategoryItemProps {
  item: ICategory
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
  const [isGettingEdited, setIsGettingEdited] = useState(false)
  const [input, setInput] = useState('')

  const {
    miscStore: { categories }
  } = useStore()

  const { id } = item

  const handleItemDelete = action(() => {
    categories.remove(item)
  })

  const handleItemEdit = action(() => {
    if (isGettingEdited) {
      const updatedList = categories.map((currentItem) =>
        currentItem.id === id
          ? {
              ...currentItem,
              title: input === '' ? currentItem.title : input
            }
          : currentItem
      )
      categories.replace(updatedList)
      setInput('')
      // Just for a fail-safe we put false here instead of !isGettingEdited
      setIsGettingEdited(false)
    } else {
      setIsGettingEdited(!isGettingEdited)
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  return (
    <div className="CategoryItem">
      <div className="TodoItem">
        {!isGettingEdited ? (
          <i className="TodoItem-Title">{item.title}</i>
        ) : (
          <input
            className="TodoItem-Title"
            onChange={(e) => {
              handleInputChange(e)
            }}
            placeholder="New title"
            value={input}
          ></input>
        )}

        <button className="TodoItem-Button _edit" onClick={handleItemEdit}>
          {!isGettingEdited ? 'Edit' : 'Save'}
        </button>

        {isGettingEdited && (
          <button
            className="TodoItem-Button _delete"
            onClick={handleItemDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
export default CategoryItem
