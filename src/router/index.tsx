import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import EditarHabitaciones from "../pages/EditarHabitaciones"
import HabitacionesPage from "../pages/Habitaciones/Habitaciones"
import Reportes from "../pages/Reportes/reportes"
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
  {
    path: "/reportes-ver",
    element: <Reportes />
  },
])
/* export default createBrowserRouter(
  createRoutesFromElements((
      <Route path={ ["/"] } element={<HabitacionesPage/>}/> 
  ))
) */