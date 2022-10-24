import { RouterProvider } from 'react-router-dom'
import router from './router'

function App() {
  return (
    <div className='flex h-full'>
      <div className='w-60 flex-shrink-0'>
        this is the submenu bitch!!!!
      </div>
      <div className='w-full h-full'>
        <div>Upbar</div>
        <div className='p-4'>
          {/* <UserForm />
          <UsersList /> */}
          <RouterProvider router={router}/>
        </div>
      </div>
    </div>
  )
}

export default App
