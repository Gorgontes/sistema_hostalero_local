import React, { useState, useRef, useEffect, useMemo, useCallback, ElementRef } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import './style.css';


const habitacionesDatos = [
    {
        "nombre": "Max Torres",
        "documento": "78787878",
        "habitacion": "100",
        "precio": 150.10,
        "fechaIngreso": "10/12/2022",
        "fechaSalida": "30/12/2022",
        "estadia": 10,
    },
    {
        "nombre": "Max 2 Torres 2",
        "documento": "78787878",
        "habitacion": "101",
        "precio": 150.20,
        "fechaIngreso": "10/11/2022",
        "fechaSalida": "30/11/2022",
        "estadia": 20,
    },
    {
        "nombre": "Max 3 Torres 3",
        "documento": "78787878",
        "habitacion": "103",
        "precio": 150.30,
        "fechaIngreso": "10/10/2022",
        "fechaSalida": "30/10/2022",
        "estadia": 30,
    }
]


const ReportesVer = () => {

    const gridRef = useRef<ElementRef<typeof AgGridReact>>(null); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState<typeof habitacionesDatos>(); // Set rowData to Array of Objects, one Object per Row

    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: 'nombre' },
        { field: 'documento' },
        { field: 'habitacion' },
        {
            field: 'precio',
            // valueParser: numberParser,
            cellClassRules: {
                'rag-green': 'x < 20',
                'rag-amber': 'x >= 20 && x < 25',
                'rag-red': 'x >= 25',
            },
        },
        { field: 'fechaIngreso' },
        { field: 'fechaSalida' },
        { field: 'estadia' },
        // { field: 'make', filter: true },
        // { field: 'model', filter: true },
        // { field: 'price' }
    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
    }), []);

    // Example of consuming Grid Event
    const cellClickedListener = useCallback((event: any) => {
        console.log('cellClicked', event);
    }, []);

    // Example load data from sever
    useEffect(() => {
        fetch('https://www.ag-grid.com/example-assets/row-data.json')
            .then(result => result.json())
            .then(rowData => {

                // setRowData(rowData)
                setRowData(habitacionesDatos)

                console.log(rowData);
            }
            )
    }, []);

    return (
        <div className='h-full'>
            <div className='text-3xl my-3 text-primario font-semibold'>Reportes Generales</div>
            <div className="ag-theme-alpine h-full w-full px-5 pb-5">

                <AgGridReact
                    className='bg-red-500'
                    ref={gridRef} // Ref for accessing Grid's API

                    rowData={rowData} // Row Data for Rows

                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties

                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows

                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                />
            </div>

            {/* <div className='h-[50px] '>
            </div> */}
        </div>
    );
};

export default ReportesVer;