import cntl from "cntl";
import { StringifyOptions } from "querystring";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { BasicStateRoom } from "../constants/enums/BasicStateRoom";

type Props = {
    banos: number
    camas: number
    hasTv: boolean
    hasWifi: boolean
};

const BcDetallesHabitacion = ({ banos, camas, hasTv, hasWifi }: Props) => {


    return (
        <div className="items-center justify-center content-center">
            <div className="flex">
                <div className="flex items-center">
                    <div className="">Camas:</div>
                    <div className="text-primario text-[45px] ml-3">{camas}</div>
                </div>
                <div className="flex items-center ml-10">
                    <div>Wifi: </div>
                    <div className="text-primario text-[45px] ml-3"> {hasWifi ? 'SI' : 'NO'}</div>
                </div>
            </div>
            <div className="flex">
                <div className="flex items-center">
                    <div className="">Baños:</div>
                    <div className="text-primario text-[45px] ml-3">{banos}</div>
                </div>
                <div className="flex items-center ml-10">
                    <div>Tv: </div>
                    <div className="text-primario text-[45px] ml-3"> {hasTv ? 'SI' : 'NO'}</div>
                </div>
            </div>
        </div>
    );
};


export default BcDetallesHabitacion;