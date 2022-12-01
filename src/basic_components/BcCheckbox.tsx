import cntl from "cntl";
import { StringifyOptions } from "querystring";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

// type Estado = "ocupada" | "libre" | "reservada";

type Props = {
    label: string,
    isActive: boolean,
    // estado: Estado;
    // nombre: string;
    // onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
    // className?: string;
};

const styleEstado = {
    libre: cntl`text-primario bg-white border-primario border-4`,
    ocupada: cntl`text-white bg-primario border-primario border-4`,
    reservada: cntl`text-white bg-morado`,
};

const BcCheckbox = ({ label, isActive }: Props) => {
    return (
        <div className={`text-primario py-0 rounded-lg text-center`}>
            {label}
            <Checkbox defaultChecked className="ml-5"></Checkbox>
        </div>
    );
};


export default BcCheckbox;