import cntl from "cntl";
import { StringifyOptions } from "querystring";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { BasicStateRoom } from "../constants/enums/BasicStateRoom";

// type Estado = "ocupada" | "libre" | "reservada";

type Props = {
    numero: string,
    estado: BasicStateRoom
};

const styleEstado = {
    libre: cntl`text-primario bg-white border-primario border-4`,
    ocupada: cntl`text-white bg-primario border-primario border-4`,
    reservada: cntl`text-white bg-morado`,
};

const BcHabitacionNumber = ({ numero, estado }: Props) => {
    let _colorBorder = "";
    let _colorText = "";

    switch (estado) {
        case BasicStateRoom.free:
            // _colorBorder = "border-rojo_suave";
            _colorBorder = "text-primario bg-white border-primario border-4";
            _colorText = "text-primario";
            break;
        case BasicStateRoom.occupied:
            // _colorBorder = "border-oscuro";
            _colorBorder = "text-white bg-primario border-primario border-4";
            _colorText = "text-white";
            break;
        case BasicStateRoom.reserved:
            // _colorBorder = "border-amarillo_suave";
            _colorBorder = "text-white bg-morado";
            _colorText = "text-white";
            break;

        default:
            _colorBorder = "border-oscuro";
            _colorText = "text-white";
            break;
    }


    let _sizeNumber
    if (numero.length < 4) {
        _sizeNumber = 'text-8xl'
    } else if (numero.length < 8) {
        _sizeNumber = 'text-4xl'
    } else {
        _sizeNumber = 'text-2xl'

    }
    return (
        <div className={`
            ${_colorBorder}
            ${_colorText}
            ${_sizeNumber}
            font-semibold
            py-8 text-center
            flex items-center
            w-72 h-48 justify-center rounded-lg
        `}>
            <span>{numero}</span>
        </div>
    );
};


export default BcHabitacionNumber;