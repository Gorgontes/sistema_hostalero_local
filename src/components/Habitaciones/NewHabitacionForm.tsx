import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import { useCallback, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
const MAX_DECIMAL_INPUT = 2;

type Props = {
  callback?: (habitacion: Omit<Prisma.HabitacionCreateInput, "piso">) => void;
};

type HabitacionFormValues = {
  nombreHabitacion: string;
  camas: string;
  banos: string;
  tv: boolean;
  wifi: boolean;
  precioReferencial: string;
  descripcion: string;
  observaciones: string;
};

const defaultValues = {
  nombreHabitacion: "1",
  camas: "1",
  banos: "1",
  tv: true,
  wifi: true,
  precioReferencial: "",
  descripcion: "",
  observaciones: "",
};
const regPrecio = new RegExp(String.raw`^\s*\d+(\.\d{0,`+ MAX_DECIMAL_INPUT.toString() + String.raw`})?\s*$`);
// console.log('pattern', new RegExp(/^\s*\d+(\.\d{0,2})?\s*$/))
console.log('pattern', regPrecio)
console.log('pattern', regPrecio.test('2'))

const HabitacionForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues });
  const onSubmit: SubmitHandler<HabitacionFormValues> = (data) => {
    let {precioReferencial, camas, banos, ...formulario } = data;
    let newFormulario: (typeof formulario & {
      camas: number | null,
      banos: number | null,
      precioReferencial: number | null,
    }) = formulario as any;
    // newFormulario.
    console.log(precioReferencial)
    if(precioReferencial) {
      const index = precioReferencial.search('.')
      if (index >= 0) {
        precioReferencial += '0'.repeat(MAX_DECIMAL_INPUT - (precioReferencial.length - index - 1))
      }
      newFormulario.precioReferencial = parseInt(precioReferencial.replace('.',''),10);
    } else {
      newFormulario.precioReferencial = null;
    }
    if(camas)
      newFormulario.camas = parseInt(camas,10);
    if(banos)
      newFormulario.banos = parseInt(banos,10);
    console.log(newFormulario);
  };
  console.log("rendering form");
  return (
    <form className="py-2 px-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        className="grid grid-cols-[1fr,20rem] gap-x-4"
        isRequired
        isInvalid={!!errors.nombreHabitacion}
      >
        <FormLabel className="whitespace-nowrap text-primario">
          Nombre y/o numero de habitacion
        </FormLabel>
        <Input {...register("nombreHabitacion", { required: true })} />
        <FormErrorMessage className="col-span-2">
          Nombre y/o numero de habitacion es requerido
        </FormErrorMessage>
      </FormControl>

      <div className="grid grid-cols-[minmax(0,4fr),minmax(0,2fr),minmax(0,4fr)] grid-rows-2 gap-2 grid-flow-col">
        <FormControl className="flex items-baseline justify-end">
          <FormLabel className="text-primario">Camas</FormLabel>

          <Controller
            name="camas"
            control={control}
            render={({ field }) => (
              <NumberInput className="!w-24 mx-4" min={0} {...field} >
                <NumberInputField className="!pr-2"/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
        </FormControl>

        <FormControl className="flex items-baseline justify-end">
          <FormLabel className="text-primario">Baños privados</FormLabel>
          <Controller
            name="banos"
            control={control}
            rules={
              {pattern: regPrecio}
            }
            render={({ field, fieldState }) => (
              <>
              <NumberInput className="!w-24 mx-4" min={0} {...field} >
                <NumberInputField className="!pr-2" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {fieldState.error && fieldState.error.message}
              </>
            )}
          />
        </FormControl>

        <FormControl className="flex items-baseline justify-end pt-1">
          <FormLabel className="text-primario">TV</FormLabel>
          <Controller
            name="tv"
            control={control}
            render={({ field: { value, ...field } }) => (
              <Checkbox isChecked={value} {...field} />
            )}
          />
        </FormControl>

        <FormControl className="flex items-baseline justify-end pt-1">
          <FormLabel className="text-primario">WIFI</FormLabel>
          <Controller
            name="wifi"
            control={control}
            render={({ field: { value, ...field } }) => (
              <Checkbox isChecked={value} {...field} />
            )}
          />
        </FormControl>

        <FormControl className="row-span-2">
          <FormLabel className="whitespace-nowrap text-primario !text-center">
            Precio referencial
          </FormLabel>
          <div className="flex justify-center items-center">
            <>
              <NumberInput className="!w-40 relative">
                <NumberInputField
                  {...register("precioReferencial", {
                    valueAsNumber: true,
                    min: {
                      message: "(*)No se aceptan numeros negativos",
                      value: 0,
                    },
                  })}
                />
                <div className="absolute top-full text-rojo text-xs">
                  {errors.precioReferencial?.message}
                </div>
              </NumberInput>
            </>
          </div>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
      </div>

      <FormControl>
        <FormLabel className="text-primario">Descripción</FormLabel>
        <Textarea {...register("descripcion")} />
      </FormControl>

      <FormControl>
        <FormLabel className="text-primario">Observaciones</FormLabel>
        <Textarea {...register("observaciones")} />
        <FormErrorMessage></FormErrorMessage>
      </FormControl>

      <Button type="submit" className={"ml-auto !block"} colorScheme="green">
        Crear habitacion
      </Button>
    </form>
  );
};

export default HabitacionForm;
