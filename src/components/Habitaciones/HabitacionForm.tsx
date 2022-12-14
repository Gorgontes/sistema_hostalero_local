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
import { Habitacion } from "@prisma/client";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

const SIZE_OF_DECIMALS = 2;

type Props = {
  callback?: (habitacion: HabitacionSubmitValues) => void;
  habitacion?: null | Habitacion;
  onDelete?: () => void;
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
export type HabitacionSubmitValues = {
  nombreHabitacion: string;
  camas: number;
  banos: number;
  tv: boolean;
  wifi: boolean;
  precioReferencial?: number | null;
  descripcion?: string;
  observaciones?: string;
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

const HabitacionForm = (props: Props) => {
  const [_defaultValues, _] = useState(() => {
    if (!props.habitacion) return defaultValues;
    return {
      nombreHabitacion: props.habitacion.nombreHabitacion,
      camas: props.habitacion.camas.toString(),
      banos: props.habitacion.banos.toString(),
      tv: props.habitacion.tv,
      wifi: props.habitacion.wifi,
      precioReferencial: props.habitacion.precioReferencial?.toString() ?? "",
      descripcion: props.habitacion.descripcion ?? "",
      observaciones: props.habitacion.observaciones ?? "",
    };
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: _defaultValues });

  const onSubmit: SubmitHandler<HabitacionFormValues> = (data) => {
    let { precioReferencial, camas, banos, ...formulario } = data;
    let newFormulario: HabitacionSubmitValues = formulario as any;
    if (precioReferencial) {
      let precio = parseFloat(precioReferencial);
      if (!Number.isNaN(precio)) {
        newFormulario.precioReferencial = parseFloat(
          precio.toFixed(SIZE_OF_DECIMALS)
        );
      }
    } else {
      newFormulario.precioReferencial = null;
    }
    if (camas) newFormulario.camas = parseInt(camas, 10);
    if (banos) newFormulario.banos = parseInt(banos, 10);
    props.callback && props.callback(newFormulario);
  };

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
              <NumberInput className="!w-24 mx-4" min={0} {...field}>
                <NumberInputField className="!pr-2" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          />
        </FormControl>

        <FormControl className="flex items-baseline justify-end">
          <FormLabel className="text-primario">Ba??os privados</FormLabel>
          <Controller
            name="banos"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <NumberInput className="!w-24 mx-4" min={0} {...field}>
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
                    min: {
                      message: "(*)No se aceptan numeros negativos",
                      value: 0,
                    },
                  })}
                />
              </NumberInput>
            </>
          </div>
          <FormErrorMessage></FormErrorMessage>
        </FormControl>
      </div>

      <FormControl>
        <FormLabel className="text-primario">Descripci??n</FormLabel>
        <Textarea {...register("descripcion")} />
      </FormControl>

      <FormControl>
        <FormLabel className="text-primario">Observaciones</FormLabel>
        <Textarea {...register("observaciones")} />
        <FormErrorMessage></FormErrorMessage>
      </FormControl>
      <div className="flex justify-between">
        <>
          {props.habitacion ? (
            <Button onClick={props.onDelete} colorScheme="red" >
              Eliminar habitaci??n
            </Button>
          ): ''}

          <Button type="submit" colorScheme="green" className="ml-auto">
            {props.habitacion ? "Guardar" : "Crear habitacion"}
          </Button>
        </>
      </div>
    </form>
  );
};

export default HabitacionForm;
