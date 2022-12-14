import { Input, Textarea } from '@chakra-ui/react'


type Props = {
    // label: string;
    // count: string;
};

const BcHuespedDatosFormLeft = ({ }: Props) => {
    return (
        <div className="">
            <div className="text-primario text-3xl my-3 font-bold">
                Datos del Huesped
            </div>
            <div className="text-primario">DNI / pasaporte / carnet de extranjeria</div>
            <div className="drop-shadow-xl border-none">
                {/* {count}  ml-auto w-[60px]*/}
                <Input borderColor={'primario'} className="text-left" value={0} />
            </div>
            <div className="text-primario">Nombre</div>
            <div className="">
                {/* {count}  ml-auto w-[60px]*/}
                <Input borderColor={'primario'} className="text-left" value={0} />
            </div>
            <div className='flex'>
                <div className='flex-1'>

                    <div className="text-primario">Fecha de Nacimiento</div>
                    <div className="w-[200px]">
                        {/* {count}  ml-auto w-[60px]*/}
                        <Input
                            borderColor={'primario'}
                            placeholder="fecha"
                            size="md"
                            type="date"
                        />
                    </div>
                </div>
                <div className='flex-1'>

                    <div className="text-primario">Procedencia: Provincia / ciudad</div>
                    <div className="">
                        {/* {count}  ml-auto w-[60px]*/}
                        <Input borderColor={'primario'} className="text-left" value={0} />
                    </div>
                </div>

            </div>
            <div className="text-primario">Observaciones</div>
            <div className="border-primario rounded-lg border-1">
                {/* {count}  ml-auto w-[60px]*/}
                {/* <Input borderColor={'primario'} className="text-left" value={0} /> */}
                <Textarea placeholder='' value={0} />
            </div>
        </div>
    );
}

export default BcHuespedDatosFormLeft;