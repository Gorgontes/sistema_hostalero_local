import cntl from "cntl";
import { StringifyOptions } from "querystring";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { BasicStateRoom } from "../constants/enums/BasicStateRoom";

type Props = {
    estado: BasicStateRoom
};

const BcTextWithCircleState = ({ estado }: Props) => {
    let _circleState = "";
    let _text = "";

    switch (estado) {
        case BasicStateRoom.free:
            _circleState = "h-6 w-6 bg-background_main rounded-full border-4 border-primario";
            _text = "Disponible";
            break;
        case BasicStateRoom.occupied:
            _circleState = "h-6 w-6 bg-primario rounded-full shadow-primario";
            _text = "Ocupado";
            break;
        case BasicStateRoom.reserved:
            _circleState = "h-6 w-6 bg-morado rounded-full";
            _text = "Reservado";
            break;

        default:
            _circleState = "border-oscuro";
            _text = "Error de Estado";
            break;
    }

    return (
        <>
            <div className={`
            ${_circleState}
        `}>
            </div>
            <div className="ml-5">

                {_text}
            </div>
        </>
    );
};


export default BcTextWithCircleState;