import React, { useState } from 'react'
import TodoCategories from '../TodoCategories/TodoCategories'
import TodoList from '../TodoList/TodoList'
import './TodoComponent.scss'

const TodoComponent: React.FC = () => {
  const [isCategoryButtonActive, setIsCategoryButtonActive] = useState(false)

  const handleShowCategories = (): void => {
    setIsCategoryButtonActive(!isCategoryButtonActive)
  }

  return (
    <div className="TodoComponent">
      <div className="TodoComponent-Header">
        <b>TODO LIST</b>
        <button onClick={handleShowCategories}>
          {!isCategoryButtonActive ? 'Show categories' : 'Show todos'}
        </button>
      </div>
      {!isCategoryButtonActive ? <TodoList /> : <TodoCategories />}
    </div>
  )
}
export default TodoComponent
