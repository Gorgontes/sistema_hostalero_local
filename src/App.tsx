// import { Divider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  console.log('render app')
  return (
    <div className='flex h-full'>
      <div className='w-60 flex-shrink-0'>
        this is the submenu bitch!!!!
      </div>
      <div className='w-full h-full flex flex-col'>
        <div>Upbar</div>
        <div className='grow p-4'>
          <RouterProvider router={router}/>
        </div>
      </div>
    </div>
  )
}

export default App
