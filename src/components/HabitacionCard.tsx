import cntl from "cntl";
import { StringifyOptions } from "querystring";
type Estado = "ocupada" | "libre" | "reservada";

type Props = {
  estado: Estado;
  nombre: string;
  onClick?: () => void;
};

const styleEstado = {
  libre: cntl`text-primario bg-white border-primario border-4`,
  ocupada: cntl`text-white bg-primario border-primario border-4`,
  reservada: cntl`text-white bg-morado`,
};

const HabitacionCard = (props: Props) => {
  return (
    <div
      className={`text-4xl font-bold py-4 px-8 w-fit rounded-lg ${styleEstado[props.estado]
        }`}
      onClick={props.onClick}
    >
      {props.nombre}
    </div>
  );
};

export default HabitacionCard;