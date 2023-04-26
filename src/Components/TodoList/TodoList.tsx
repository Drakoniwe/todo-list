import { action } from 'mobx'
import { observer } from 'mobx-react'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import type ITodo from '../../Interfaces/ITodo'
import { Priority } from '../../Interfaces/ITodo'
import { useStore } from '../../Store/store'
import TodoItem from '../TodoItem/TodoItem'
import './TodoList.scss'

const TodoList: React.FC = () => {
  const [input, setInput] = useState('')
  const [isFilteredByCompleted, setIsFilteredByCompleted] = useState(false)

  const {
    todoStore: { todoList }
  } = useStore()

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

  const handlePrioritySort = action((): void => {
    const sortedItems = todoList.sort(
      (a, b) => parseInt(a?.priority.value) - parseInt(b?.priority.value)
    )
    todoList.replace(sortedItems)
  })

  const todoItems = todoList
    .filter((item) => item.isCompleted === isFilteredByCompleted)
    .map((item: ITodo) => <TodoItem key={item.id} item={item} />)

  return (
    <div className="TodoList">
      <div className="TodoList-ActionButtons">
        <button onClick={handleFilterByCompletion}>Filter by completion</button>
        <button onClick={handlePrioritySort}>Sort by priority</button>
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
