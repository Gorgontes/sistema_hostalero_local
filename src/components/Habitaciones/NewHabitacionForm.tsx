import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import { Field, FieldProps, Form, Formik } from "formik";
import { useState } from "react";

type Props = {
  callback?: (habitacion: Omit<Prisma.HabitacionCreateInput, 'piso'>) => void;
  initialValues?: InitialValues;
};
interface InitialValues {
  nombreHabitacion: string,
  precioReferencial: number | string,
  tv: boolean,
  wifi: boolean,
  banos: number | string,
  camas: number | string,
  descripcion: string,
  observaciones: string,
}
const initialValuesDefault = {
  nombreHabitacion: "",
  precioReferencial: 0,
  tv: true,
  wifi: true,
  banos: 1,
  camas: 1,
  descripcion: "",
  observaciones: "",
};

const HabitacionForm = (props: Props) => {
  
  return (
    <Formik
      initialValues={props.initialValues ? props.initialValues : initialValuesDefault}
      validate={}
      onSubmit={(values, {setSubmitting}) => {
        props.callback && props.callback(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="py-2 px-5 space-y-2">
          <Field name="nombreHabitacion">
            {({ field, form }: FieldProps) => (
              <FormControl className="flex items-baseline">
                <FormLabel className="whitespace-nowrap text-primario">
                  Nombre y/o numero de habitacion
                </FormLabel>
                <Input {...field} />
              </FormControl>
            )}
          </Field>
          <div className="grid grid-cols-[minmax(0,4fr),minmax(0,2fr),minmax(0,4fr)] grid-rows-2 gap-2 grid-flow-col">
            <Field name="camas">
              {({ field }: FieldProps) => (
                <FormControl className="flex items-baseline justify-end">
                  <FormLabel className="text-primario">Camas</FormLabel>
                  <Input {...field} className="!w-12 mx-4" />
                </FormControl>
              )}
            </Field>
            <Field name="banos">
              {({ field }: FieldProps) => (
                <FormControl className="flex items-baseline justify-end">
                  <FormLabel className="text-primario">
                    Baños privados
                  </FormLabel>
                  <Input {...field} className="!w-12 mx-4" />
                </FormControl>
              )}
            </Field>
            <Field name="tv" type="checkbox">
              {({ field }: FieldProps) => (
                <FormControl className="flex items-baseline justify-end pt-3">
                  <FormLabel className="text-primario">TV</FormLabel>
                  {/* <Checkbox {...field}/> */}
                  <Checkbox
                    isChecked={field.checked}
                    onChange={field.onChange}
                    name={field.name}
                  />
                </FormControl>
              )}
            </Field>
            <Field name="wifi" type="checkbox">
              {({ field }: FieldProps) => (
                <FormControl className="flex items-baseline justify-end pt-3">
                  <FormLabel className="text-primario">WIFI</FormLabel>
                  <Checkbox
                    isChecked={field.checked}
                    onChange={field.onChange}
                    name={field.name}
                  />
                </FormControl>
              )}
            </Field>
            <Field name="precioReferencial">
              {({ field }: FieldProps) => (
                <FormControl className="row-span-2">
                  <FormLabel className="whitespace-nowrap text-primario !text-center">
                    Precio referencial
                  </FormLabel>
                  <div className="flex justify-center items-center">
                    <div className="mr-5 text-primario">S/.</div>
                    {/* <Input/> */}
                    
                    <NumberInput  className="!w-40">
                      <NumberInputField {...field}/>
                    </NumberInput>
                  </div>
                </FormControl>
              )}
            </Field>
          </div>
          <Field name="descripcion">
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel className="text-primario">Descripción</FormLabel>
                <Textarea {...field} />
              </FormControl>
            )}
          </Field>
          <Field name="observaciones">
            {({ field }: FieldProps) => (
              <FormControl>
                <FormLabel className="text-primario">Observaciones</FormLabel>
                <Textarea {...field} />
              </FormControl>
            )}
          </Field>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={"ml-auto !block"}
            colorScheme="green"
          >
            Crear habitacion
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default HabitacionForm;
