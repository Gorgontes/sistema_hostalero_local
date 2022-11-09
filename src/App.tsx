// import { Divider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  console.log('render app')
  return (
    <div className='h-full bg-transparent'>
      <div className='w-full h-full flex flex-col bg-transparent'>
        <div>windows bar</div>
        <div className='grow p-4 bg-transparent'>
          <RouterProvider router={router}/>
        </div>
      </div>
    </div>
  )
}

export default App
