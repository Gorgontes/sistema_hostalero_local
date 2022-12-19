// import { Divider } from '@chakra-ui/react'
import {
  RouterProvider,
  Routes,
  HashRouter as Router,
  Route,
} from "react-router-dom";
import NavBarHome from "./components/navbar/NavBar";
import EditarHabitaciones from "./pages/EditarHabitaciones";
import Error404 from "./pages/Error404/Error404";
import HabitacionesPage from "./pages/Habitaciones/Habitaciones";
import ReportesVer from "./pages/Reportes/ReportesVer";

function App() {
  console.log("render app");
  return (
    <Router>
      <div className="h-full bg-transparent">
        <div className="w-full h-full flex flex-col bg-transparent">
          <div>
            <NavBarHome />
          </div>
          <div className="grow p-4 bg-transparent">
            <Routes>
              <Route path={"/"} element={<HabitacionesPage />} />
              <Route path={"/habitaciones"} element={<HabitacionesPage />} />
              <Route
                path={"/editar-habitaciones"}
                element={<EditarHabitaciones />}
              />
              <Route path={"/reportes-ver"} element={<ReportesVer />} />
              <Route path={"*"} element={<Error404 />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
