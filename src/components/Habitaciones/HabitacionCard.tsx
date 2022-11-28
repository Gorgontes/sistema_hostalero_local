import cntl from "cntl";
import { StringifyOptions } from "querystring";
type Estado = "ocupada" | "libre" | "reservada";

type Props = {
  estado: Estado;
  nombre: string;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  className?: string;
};

const styleEstado = {
  libre: cntl`text-primario bg-white border-primario border-4`,
  ocupada: cntl`text-white bg-primario border-primario border-4`,
  reservada: cntl`text-white bg-morado`,
};

const HabitacionCard = ({className, estado, onClick, nombre}: Props) => {
  const estilosAdicionales = `${styleEstado[estado]} ${className}`
  return (
    <div
      className={`text-3xl font-bold py-4 rounded-lg text-center ${estilosAdicionales}`}
      onClick={onClick}>
      {nombre}
    </div>
  );
};


export default HabitacionCard;
