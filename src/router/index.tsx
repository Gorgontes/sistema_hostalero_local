import { createBrowserRouter } from "react-router-dom"
import HabitacionesPage from "../pages/Habitaciones"
export default createBrowserRouter([
  {
    path: "/",
    element: <HabitacionesPage/>
  }
])