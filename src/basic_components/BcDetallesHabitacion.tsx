import cntl from "cntl";
import { StringifyOptions } from "querystring";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { BasicStateRoom } from "../constants/enums/BasicStateRoom";

type Props = {
  banos: number;
  camas: number;
  hasTv: boolean;
  hasWifi: boolean;
};

const BcDetallesHabitacion = ({ banos, camas, hasTv, hasWifi }: Props) => {
  return (
    <div className="items-center justify-center content-center">
      <div className="grid grid-cols-2 grid-rows-2 justify-end">

        <div className="flex items-center justify-end mr-8">
          <div className="">Camas:</div>
          <div className="text-primario text-[45px] ml-4">{camas}</div>
        </div>
        <div className="flex items-center justify-end mr-8">
          <div>Wifi: </div>
          <div className="text-primario text-[45px] ml-4">
            {" "}
            {hasWifi ? "SI" : "NO"}
          </div>
        </div>
      
      
        <div className="flex items-center justify-end mr-8">
          <div className="">Baños:</div>
          <div className="text-primario text-[45px] ml-4">{banos}</div>
        </div>
        <div className="flex items-center justify-end mr-8">
          <div>Tv: </div>
          <div className="text-primario text-[45px] ml-4">
            {" "}
            {hasTv ? "SI" : "NO"}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default BcDetallesHabitacion;
