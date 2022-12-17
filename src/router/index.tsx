import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import EditarHabitaciones from "../pages/EditarHabitaciones"
import HabitacionesPage from "../pages/Habitaciones/Habitaciones"
import ReportesVer from "../pages/Reportes/ReportesVer"
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
    element: <ReportesVer />
  },
])
/* export default createBrowserRouter(
  createRoutesFromElements((
      <Route path={ ["/"] } element={<HabitacionesPage/>}/> 
  ))
) */