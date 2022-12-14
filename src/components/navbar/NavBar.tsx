import { background } from "@chakra-ui/react";
import React from "react";
import ButtonDropDown from "../ButtonDropDown/ButtonDropDown";
import ConnectionDrive from "../ConnectionDrive/ConnectionDrive";

type Props = {
  // estado: Estado,
  // nombre: string
};

const opciones = {
  label: "Opciones",
  items: [
    {
      label: "Habitaciones",
      url: "/habitaciones",
    },
    {
      label: "Inventario",
      url: "/error-404",
    },
    {
      label: "Configurar Hotel",
      url: "/editar-habitaciones",
    },
    // {
    //     "label": "Salir",
    //     "url": "/error-404"
    // }
  ],
};
const caja = {
  label: "Caja",
  items: [
    {
      label: "cajita 1",
      url: "/error-404",
    },
    {
      label: "cajita 2",
      url: "/error-404",
    },
  ],
};
const reportes = {
  label: "Estados",
  items: [
    {
      label: "Actual",
      url: "/reportes-ver",
    },
  ],
};
const historial = {
  label: "Historial",
  items: [
    {
      label: "historita",
      url: "/error-404",
    },
  ],
};
const acerca = {
  label: "Acerca",
  items: [
    {
      label: "ver acerca",
      url: "/error-404",
    },
  ],
};

const NavBarHome = (props: Props) => {
  return (
    <div className="bg-primario flex">
      <ButtonDropDown {...opciones} />
      <ButtonDropDown {...reportes} />
      <ConnectionDrive />
    </div>
  );
};

export default NavBarHome;
