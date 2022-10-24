import { createBrowserRouter } from "react-router-dom"
import RoomPage from "../pages/Room"
export default createBrowserRouter([
  {
    path: "/",
    element: <RoomPage/>
  }
])