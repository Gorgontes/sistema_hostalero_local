import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './assets/css/App.css'
import UsersList from './components/UsersList'
import UserForm from './components/UserForm'

function App() {
  return (
    <div className="App">
      <UserForm />
      <UsersList />
    </div>
  )
}

export default App
