import {
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { forwardRef } from "react";

type Props = {
  label: string;
  // onChange: (val: bool) => void
};

const BcTextAndCount = forwardRef<HTMLInputElement, Props>(({ label }, ref) => {
  return (
    <div className="flex py-2 items-baseline">
      <div className="text-primario">{label}</div>
      <div className="ml-auto w-24">
        <NumberInput max={999} min={0}>
          <NumberInputField ref={ref}/>
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {/* <Input className="text-center !border-primario !border-2 " /> */}
      </div>
    </div>
  );
});

export default BcTextAndCount;
