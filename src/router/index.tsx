import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import EditarHabitaciones from "../pages/EditarHabitaciones"
import HabitacionesPage from "../pages/Habitaciones/Habitaciones"
import ReportesVer from "../pages/Reportes/ReportesVer"
import Error404 from "../pages/Error404/Error404"

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
  {
    path: "*",
    element: <Error404 />
  },
])
/* export default createBrowserRouter(
  createRoutesFromElements((
      <Route path={ ["/"] } element={<HabitacionesPage/>}/> 
  ))
) */