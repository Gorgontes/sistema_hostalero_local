import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { Controller, Resolver, SubmitHandler, useForm } from "react-hook-form";

type Props = {
  onSubmit?: (piso: PisoSubmitValues) => void;
};

type PisoSubmitValues = {
  numeroPiso: number;
  detalles?: string;
};

type PisoFormValues = {
  numeroPiso: string;
  detalles?: string;
}


const PisoForm = (props: Props) => {
  const { register, handleSubmit, control } = useForm<PisoFormValues>();
  const onSubmit: SubmitHandler<PisoFormValues> = (data) => {
    if(props.onSubmit) {
      props.onSubmit({
        numeroPiso: parseInt(data.numeroPiso),
        detalles: data.detalles
      })
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <FormControl>
        <FormLabel className="text-primario">Numero piso</FormLabel>
        <Controller
          control={control}
          name={"numeroPiso"}
          rules={{required: true}}
          render={({ field: { onChange, value } }) => (
            <>
              <NumberInput onChange={onChange} defaultValue={value} min={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </>
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel className="text-primario">Detalles</FormLabel>
        <Textarea {...register("detalles")} />
      </FormControl>
      <Button type="submit" className="!block ml-auto">
        Crear piso
      </Button>
    </form>
  );
};

export default PisoForm;

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

export function App() {
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="email" {...register("email")} />

      <input type="submit" />
    </form>
  );
}
