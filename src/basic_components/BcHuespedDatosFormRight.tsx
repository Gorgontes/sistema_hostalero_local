import { AddIcon, CalendarIcon, CheckIcon, LockIcon } from '@chakra-ui/icons';
import { Button, Input, Textarea } from '@chakra-ui/react'
import { BasicStateRoom } from '../constants/enums/BasicStateRoom';


type Props = {
    status: BasicStateRoom
    // label: string;
    // count: string;
};

const BcHuespedDatosFormRight = ({ status }: Props) => {
    return (
        <div className="">
            <div className="text-primario text-3xl my-3 font-bold">
                Datos de Estadía
            </div>
            <div className='flex items-center'>

                <div className="text-primario mr-2">Fecha de Ingreso</div>
                <div className="w-[200px] mr-3">
                    {/* {count}  ml-auto w-[60px]*/}
                    <Input
                        borderColor={'primario'}
                        placeholder="fecha"
                        size="md"
                        type="date"
                    />
                </div>
                <div className="text-primario mr-2">Noches</div>
                <div className="w-[50px]">
                    {/* {count}  ml-auto w-[60px]*/}
                    <Input borderColor={'primario'} className="text-left" value={0} />
                </div>


            </div>
            <div className='flex items-center my-5'>
                <div className="text-primario mr-5">Fecha Estimada de Salida</div>
                <div className="text-primario text-2xl">11/12/2022</div>
            </div>
            <div className='flex items-center mt-20 text-center'>
                <div className="text-primario mr-5">Costo</div>
                <div className="text-primario text-2xl">s/. 126.00</div>
            </div>
            <_Buttons status={status} />
        </div>
    );
}

export default BcHuespedDatosFormRight;
// ---------------------------------------- intern
type _Props = {
    status: BasicStateRoom
    // label: string;
    // count: string;
};
const _Buttons = ({ status }: _Props) => {
    switch (status) {
        case BasicStateRoom.free:

            return (
                <div className='flex items-center mt-10 content-center'>
                    <Button leftIcon={<CheckIcon />} color={"white"} backgroundColor="blue"
                        className='w-[170px]'
                        onClick={() => {

                        }}
                    >
                        Ocupar
                    </Button>
                    <Button leftIcon={<CalendarIcon />} color={"white"} backgroundColor="purple"
                        className='w-[170px]'
                        onClick={() => {

                        }}
                    >
                        Reservar
                    </Button>
                </div>
            );
        case BasicStateRoom.occupied:

            return (
                <div className='flex items-center mt-10'>

                    <Button leftIcon={<CheckIcon />} color={"white"} backgroundColor="blue"
                        className='w-[170px]'
                        onClick={() => {

                        }}
                    >
                        Finalizar
                    </Button>
                </div>
            );
        case BasicStateRoom.reserved:
            return (
                <div className='flex items-center mt-10'>

                    <Button leftIcon={<LockIcon />} color={"white"} backgroundColor="blue"
                        className='w-[170px]'
                        onClick={() => {

                        }}
                    >
                        Ocupar
                    </Button>
                </div>
            );


        default:
            return (
                <>Error Generar Botones</>);
    }
}

