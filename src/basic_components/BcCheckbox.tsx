import cntl from "cntl";
import { StringifyOptions } from "querystring";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { forwardRef } from "react";

type Props = {
  label: string;
  isActive: boolean;
};

const styleEstado = {
  libre: cntl`text-primario bg-white border-primario border-4`,
  ocupada: cntl`text-white bg-primario border-primario border-4`,
  reservada: cntl`text-white bg-morado`,
};

const BcCheckbox = forwardRef<HTMLInputElement, Props>(
  ({ label, isActive }, ref) => {
    console.log(isActive);
    return (
      <div className={`text-primario py-0 rounded-lg text-center`}>
        <span className="w-16 inline-block">{label}</span>
        <Checkbox
          ref={ref}
          className="ml-5"
          defaultChecked={isActive}
        ></Checkbox>
      </div>
    );
  }
);

export default BcCheckbox;
