import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";
import { Prisma } from "@prisma/client";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";

type Props = {
  callback?: (habitacion: Omit<Prisma.HabitacionCreateInput, "piso">) => void;
  initialValues?: InitialValues;
};
interface InitialValues {
  nombreHabitacion: string;
  precioReferencial: number | string;
  tv: boolean;
  wifi: boolean;
  banos: number | string;
  camas: number | string;
  descripcion: string;
  observaciones: string;
}
const initialValuesDefault = {
  nombreHabitacion: "",
  precioReferencial: 110,
  tv: true,
  wifi: true,
  banos: "1",
  camas: "1",
  descripcion: "",
  observaciones: "",
};

const schema = Yup.object().shape({
  nombreHabitacion: Yup.string().required(),
  //este regex valida si es un numero con 2 digitos
  precioReferencial: Yup.string().optional().matches(/^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/),
  tv: Yup.boolean(),
  wifi: Yup.boolean(),
  banos: Yup.string().required().matches(/^[1-9]\d*$/, 'No es un numero valido'),
  camas: Yup.string().required().matches(/^[1-9]\d*$/, 'No es un numero valido'),
  descripcion: Yup.string().optional(),
  observaciones: Yup.string().optional(),
});
function validate(values: InitialValues) {
  // console.log("validando");
  return {};
}

const HabitacionForm = (props: Props) => {
  // console.log("rendering");
  // console.log("schema", schema);
  // console.log("spec", (schema.fields["nombreHabitacion"] as any).spec);
  schema.validate({
    nombreHabitacion: "dd",
    precioReferencial: 1,
    tv: true,
    wifi: true,
    banos: "1",
    camas: "1",
    descripcion: "",
    observaciones: "",
  }).then((val) => console.log(val)).catch(e => console.warn(e));
  return (
    <Formik
      initialValues={
        props.initialValues ? props.initialValues : initialValuesDefault
      }
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="py-2 px-5 space-y-2">
          <Field name="nombreHabitacion" isR>
            {({ field, form, meta }: FieldProps) => (
              <FormControl
                className="grid grid-cols-[1fr,20rem] gap-x-4"
                isRequired
                isInvalid={!!meta.error}
              >
                <FormLabel className="whitespace-nowrap text-primario">
                  Nombre y/o numero de habitacion 
                </FormLabel>
                <Input {...field} />
                <FormErrorMessage className="col-span-2">
                  Nombre y/o numero de habitacion es requerido
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <div className="grid grid-cols-[minmax(0,4fr),minmax(0,2fr),minmax(0,4fr)] grid-rows-2 gap-2 grid-flow-col">
            <Field name="camas">
              {({ field: {value, onChange, name} , meta, form}: FieldProps) => (
                <FormControl
                  className="flex items-baseline justify-end"
                  isRequired={!!meta.error}
                >
                  <FormLabel className="text-primario">Camas</FormLabel>
                  <NumberInput className="!w-20 mx-4" value={value} onChange={val => form.setFieldValue(name, val)}>
                    <NumberInputField className="!pr-2"/>
                  </NumberInput>
                </FormControl>
              )}
            </Field>
            <Field name="banos">
              {({ field , meta, form }: FieldProps) => (
                <FormControl
                  className="flex items-baseline justify-end"
                  isRequired={ !!meta.error }
                  isInvalid={ !!meta.error }
                >
                  <FormLabel className="text-primario">
                    Baños privados
                  </FormLabel>
                  <NumberInput className="!w-20 mx-4" value={field.value} onChange={val => {form.setFieldValue(field.name, val)}} >
                    <NumberInputField className="!pr-2"/>
                  </NumberInput>
                </FormControl>
              )}
            </Field>
            <Field name="tv" type="checkbox">
              {({ field, meta }: FieldProps) => (
                <FormControl
                  className="flex items-baseline justify-end pt-1"
                >
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
              {({ field, meta }: FieldProps) => (
                <FormControl className="flex items-baseline justify-end pt-1">
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
              {({ field, meta }: FieldProps) => (
                <FormControl
                  className="row-span-2"
                >
                  <FormLabel className="whitespace-nowrap text-primario !text-center">
                    Precio referencial
                  </FormLabel>
                  <div className="flex justify-center items-center">
                    <div className="mr-5 text-primario">S/.</div>
                    {/* <Input/> */}

                    <NumberInput className="!w-40">
                      <NumberInputField {...field} />
                    </NumberInput>
                  </div>
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </div>
          <Field name="descripcion">
            {({ field, meta }: FieldProps) => (
              <FormControl >
                <FormLabel className="text-primario">Descripción</FormLabel>
                <Textarea {...field} />
              </FormControl>
            )}
          </Field>
          <Field name="observaciones">
            {({ field,meta }: FieldProps) => (
              <FormControl >
                <FormLabel className="text-primario">Observaciones</FormLabel>
                <Textarea {...field} />
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
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
