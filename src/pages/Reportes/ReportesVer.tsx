import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  ElementRef,
} from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "./style.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const habitacionesDatos = [
  {
    nombre: "Max Torres",
    documento: "78787878",
    habitacion: "100",
    precio: 150.1,
    fechaIngreso: "10/12/2022",
    fechaSalida: "30/12/2022",
    estadia: 10,
  },
];

const ReportesVer = () => {
  const gridRef = useRef<ElementRef<typeof AgGridReact>>(null);
  const queryClient = useQueryClient()
  const [rowData, setRowData] = useState<typeof habitacionesDatos>();
  const [cargo, setCargo] = useState(false)
  const { data, isSuccess } = useQuery(["habitaciones"], () => {
    setCargo(true)
    return window.Main.db.reportes.getReporte();
  }, {
    refetchOnMount: "always",
  });

  useEffect(() => {
    setTimeout(() => {
      queryClient.invalidateQueries({queryKey: ['habitaciones'] })
    }, 250)
  }, [])

  if (isSuccess && cargo) {
    const rawData: typeof habitacionesDatos  = [];
    for(const habitacion of data as unknown as (typeof data)[]) {
      rawData.push({
        documento: habitacion.reservaActual?.cliente?.numeroDocumento!,
        estadia: habitacion.reservaActual?.noches!,
        fechaIngreso: habitacion.reservaActual?.fechaIngreso?.toISOString().substring(0,10)!,
        fechaSalida: habitacion.reservaActual?.fechaIngreso?.toISOString().substring(0,10)!,
        habitacion: habitacion.nombreHabitacion,
        nombre: habitacion.reservaActual?.cliente.nombresCompletos!,
        precio: habitacion.reservaActual?.precio!,
      })
    }
    setCargo(false)
    setRowData(rawData);
  }

  const [columnDefs, setColumnDefs] = useState([
    { field: "nombre" },
    { field: "documento" },
    { field: "habitacion" },
    {
      field: "precio",
      cellClassRules: {
        "rag-green": "x < 20",
        "rag-amber": "x >= 20 && x < 25",
        "rag-red": "x >= 25",
      },
    },
    { field: "fechaIngreso" },
    { field: "fechaSalida" },
    { field: "estadia" },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const cellClickedListener = useCallback((event: any) => {
    console.log("cellClicked", event);
  }, []);

  return (
    <div className="h-full">
      <div className="text-3xl my-3 text-primario font-semibold">
        Estado actual de habitaciones
      </div>
      <div className="ag-theme-alpine h-full w-full px-5 pb-5">
        <AgGridReact
          // className="bg-red-500"
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>

      {/* <div className='h-[50px] '>
            </div> */}
    </div>
  );
};

export default ReportesVer;
