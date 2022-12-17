import { Input, Textarea } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { BasicStateRoom } from "../constants/enums/BasicStateRoom";
import Prisma from '@prisma/client'

type Props = {
  status: BasicStateRoom,
  huesped?: Prisma.Cliente
};

type DatosHuesped = {
  numeroDocumento: string;
  nombresCompletos: string;
  ciudadProcedencia?: string;
  fechaNacimiento: string;
  observaciones: string;
};

interface Handlers {
  getDatosHuesped: () => DatosHuesped;
}

const BcHuespedDatosFormLeft = forwardRef<Handlers, Props>((props, ref) => {
  const { register, getValues } = useForm<DatosHuesped>();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const isEditable = props.status !== BasicStateRoom.free
  useImperativeHandle(
    ref,
    () => ({
      getDatosHuesped: getValues,
    }),
    []
  );
  return (
    <form>
      <div className="text-primario text-3xl my-3 font-bold">
        Datos del Huesped
      </div>
      <div className="text-primario">
        DNI / pasaporte / carnet de extranjeria
      </div>
      <div className="drop-shadow-xl border-none">
        <Input
          className="text-left"
          type={"number"}
          {...register("numeroDocumento")}
          readOnly={isEditable}
        />
      </div>
      <div className="text-primario">Nombre</div>
      <div className="">
        <Input
          className="text-left border-primario"
          {...register("nombresCompletos", {required: true})}
          readOnly={isEditable}
        />
      </div>
      <div className="flex">
        <div className="flex-1">
          <div className="text-primario">Fecha de Nacimiento</div>
          <div className="w-[200px]">
            <Input
              placeholder="fecha"
              size="md"
              type="date"
              className="border-primario"
              {...register("fechaNacimiento")}
              readOnly={isEditable}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-primario ">Procedencia: Provincia / ciudad</div>
          <div className="">
            <Input
              className="text-left border-primario"
              {...register("ciudadProcedencia")}
              readOnly={isEditable}
            />
          </div>
        </div>
      </div>
      <div className="text-primario">Observaciones</div>
      <div className="rounded-lg border-1">
        <Textarea {...register("observaciones")} readOnly={isEditable}/>
      </div>
    </form>
  );
});

export default BcHuespedDatosFormLeft;
