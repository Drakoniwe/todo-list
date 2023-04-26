import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './style/variables.scss'
import TodoComponent from './Components/TodoComponent/TodoComponent'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <TodoComponent />
  </React.StrictMode>
)
