import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './assets/css/App.css'
import UsersList from './components/UsersList'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <UsersList/>
    </div>
  )
}

export default App
