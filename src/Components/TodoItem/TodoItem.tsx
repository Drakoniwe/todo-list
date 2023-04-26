import { action } from 'mobx'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import type ITodo from '../../Interfaces/ITodo'
import { useStore } from '../../Store/store'
import './TodoItem.scss'
import Select, { type SingleValue } from 'react-select'
import { Priority } from '../../Interfaces/ITodo'

interface TodoItemProps {
  item: ITodo
  categoryOptions: Array<{
    value: string
    label: string
  }>
}

const TodoItem: React.FC<TodoItemProps> = ({ item, categoryOptions }) => {
  const [input, setInput] = useState('')
  const [isGettingEdited, setIsGettingEdited] = useState(false)

  const [priorityOption, setPriorityOption] = useState<{
    value: string
    label: string
  }>({ value: '', label: '' })

  const [categoryOption, setCategoryOption] = useState<{
    value: string
    label: string
  }>({ value: '', label: '' })

  const {
    todoStore: { todoList }
  } = useStore()

  const {
    priority: { label: priorityLabel },
    category,
    isCompleted
  } = item

  // Used in react-select
  const priorityOptions = [
    { value: Priority.Low, label: 'Low' },
    { value: Priority.Medium, label: 'Medium' },
    { value: Priority.High, label: 'High' }
  ]

  const handleItemDelete = action(() => {
    todoList.remove(item)
  })

  const handleItemEdit = action(() => {
    // Check if the the edit button is clicked and editing is happening
    // If so then find our todo item and replace available values, else simply close up window
    if (isGettingEdited) {
      const updatedList = todoList.map((currentItem) =>
        currentItem.id === item.id
          ? {
              ...currentItem,
              title: input === '' ? currentItem.title : input,
              priority: priorityOption,
              category: {
                title: categoryOption.label,
                id: categoryOption.value
              }
            }
          : currentItem
      )
      todoList.replace(updatedList)
      setInput('')
      // Just for a fail-safe we put false here instead of !isGettingEdited
      setIsGettingEdited(false)
    } else {
      setIsGettingEdited(!isGettingEdited)
    }
  })

  const handleItemComplete = action(() => {
    const updatedList = todoList.map((currentItem) =>
      currentItem.id === item.id
        ? { ...currentItem, isCompleted: !isCompleted }
        : currentItem
    )
    todoList.replace(updatedList)
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  const handleSelectOptionChange = (
    e: SingleValue<{
      value: string
      label: string
    }>,
    setState: React.ComponentState
  ): void => {
    if (e !== null) {
      setState({ label: e.label, value: e.value })
    }
  }

  return (
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

      <i className="TodoItem-Details">Priority: {priorityLabel}</i>
      <i className="TodoItem-Details">Category: {category?.title}</i>

      {isGettingEdited && (
        <div className="TodoItem-SelectContainer">
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Category"
            options={categoryOptions}
            onChange={(e) => {
              handleSelectOptionChange(e, setCategoryOption)
            }}
          />
          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Priority"
            options={priorityOptions}
            onChange={(e) => {
              handleSelectOptionChange(e, setPriorityOption)
            }}
          />
        </div>
      )}

      <button className="TodoItem-Button _edit" onClick={handleItemEdit}>
        {!isGettingEdited ? 'Edit' : 'Save'}
      </button>
      {!isGettingEdited && (
        <button
          className="TodoItem-Button _complete"
          onClick={handleItemComplete}
        >
          {!item.isCompleted ? 'Mark Complete' : 'Mark incomplete'}
        </button>
      )}

      {isGettingEdited && (
        <button className="TodoItem-Button _delete" onClick={handleItemDelete}>
          Delete
        </button>
      )}
    </div>
  )
}
export default observer(TodoItem)
