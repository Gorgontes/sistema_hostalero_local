import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import EditarHabitaciones from "../pages/EditarHabitaciones"
import HabitacionesPage from "../pages/Habitaciones/Habitaciones"
export default createBrowserRouter([
  {
    path: "/",
    element: <HabitacionesPage />
  },
  {
    path: "/habitaciones",
    element: <HabitacionesPage />
  },
  {
    path: "/editar-habitaciones",
    element: <EditarHabitaciones />
  },
])
/* export default createBrowserRouter(
  createRoutesFromElements((
      <Route path={ ["/"] } element={<HabitacionesPage/>}/> 
  ))
) */