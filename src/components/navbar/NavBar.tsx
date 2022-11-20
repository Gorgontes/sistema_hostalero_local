import { background } from "@chakra-ui/react";
import React from "react";
import ButtonDropDown from "../ButtonDropDown/ButtonDropDown";
import ConnectionDrive from "../ConnectionDrive/ConnectionDrive";

type Props = {
    // estado: Estado,
    // nombre: string
}

const opciones = {
    "label": "Opciones",
    "items": [
        {
            "label": "Habitaciones",
            "url": "/habitaciones"
        },
        {
            "label": "Inventario",
            "url": "---"
        },
        {
            "label": "Configurar Hotel",
            "url": "/editar-habitaciones"
        },
        {
            "label": "Salir",
            "url": "---"
        }
    ]
}
const caja = {
    "label": "Caja",
    "items": [
        {
            "label": "cajita 1",
            "url": "---"
        },
        {
            "label": "cajita 2",
            "url": "---"
        }

    ]
}
const configuracion = {
    "label": "Configuracion",
    "items": [
        {
            "label": "confi",
            "url": "---"
        },
        {
            "label": "confi 2",
            "url": "---"
        },
        {
            "label": "confi 4",
            "url": "---"
        },
        {
            "label": "confi 5",
            "url": "---"
        }
    ]
}
const historial = {
    "label": "Historial",
    "items": [
        {
            "label": "historita",
            "url": "---"
        }
    ]
}
const acerca = {
    "label": "Acerca",
    "items": [
        {
            "label": "ver acerca",
            "url": "---"
        }
    ]
}

const NavBarHome = (props: Props) => {
    return (
        <div className="bg-primario flex" >
            <ButtonDropDown {...opciones} />
            <ButtonDropDown {...caja} />
            <ButtonDropDown {...configuracion} />
            <ButtonDropDown {...historial} />
            <ButtonDropDown {...acerca} />
            <ConnectionDrive />
        </div >
    )
}

export default NavBarHome