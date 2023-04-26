import { action } from 'mobx'
import { observer } from 'mobx-react'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import type ITodo from '../../Interfaces/ITodo'
import { Priority } from '../../Interfaces/ITodo'
import { useStore } from '../../Store/store'
import TodoItem from '../TodoItem/TodoItem'
import Select, { type SingleValue } from 'react-select'
import './TodoList.scss'

const TodoList: React.FC = () => {
  const [input, setInput] = useState('')
  const [isFilteredByCompleted, setIsFilteredByCompleted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<{
    value: string
    label: string
  }>({ value: '', label: '' })

  const {
    todoStore: { todoList },
    miscStore: { categories }
  } = useStore()

  // For categories we need to get them from the state and map it so react-select accepts it
  const categoryOptions = categories.map((item) => {
    return { value: item.id, label: item.title }
  })

  const handleAddTodoButton = action((): void => {
    todoList.push({
      title: input,
      id: nanoid(),
      isCompleted: false,
      priority: { value: Priority.Low, label: 'Low' }
    })
    setInput('')
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  const handleFilterByCompletion = (): void => {
    setIsFilteredByCompleted(!isFilteredByCompleted)
  }

  const handleFilterByCategory = (
    e: SingleValue<{
      value: string
      label: string
    }>
  ): void => {
    if (e !== null) {
      setSelectedCategory({ label: e.label, value: e.value })
    } else {
      setSelectedCategory({ label: '', value: '' })
    }
  }

  const handlePrioritySort = action((): void => {
    const sortedItems = todoList.sort(
      (a, b) => parseInt(a?.priority.value) - parseInt(b?.priority.value)
    )
    todoList.replace(sortedItems)
  })

  // Applying filters right before mapping the whole list
  const todoItems = todoList
    // Filter out completed/uncompleted todos if the state on the filter button changes
    .filter((item) => item.isCompleted === isFilteredByCompleted)
    // Check if we have any category selected, if so then filter todos by that category
    .filter((item) => {
      if (selectedCategory.label !== '') {
        return item.category?.title === selectedCategory.label
      }
      return item
    })
    .map((item: ITodo) => (
      <TodoItem key={item.id} item={item} categoryOptions={categoryOptions} />
    ))

  return (
    <div className="TodoList">
      <div className="TodoList-ActionButtons">
        <button onClick={handleFilterByCompletion}>Filter by completion</button>
        <button onClick={handlePrioritySort}>Sort by priority</button>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder="Filter by Category"
          options={categoryOptions}
          isClearable={true}
          onChange={(e) => {
            handleFilterByCategory(e)
          }}
        />
      </div>
      <div className="TodoList-AddTodo">
        <input
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e)
          }}
        />
        <button disabled={input === ''} onClick={handleAddTodoButton}>
          ADD
        </button>
      </div>
      <div className="TodoList-FilterText">
        {!isFilteredByCompleted ? 'Uncompleted tasks' : 'Completed Tasks'}
      </div>

      {todoItems}
    </div>
  )
}
export default observer(TodoList)
