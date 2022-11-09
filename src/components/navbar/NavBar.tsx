import React from "react";
import TextButtonDropButton from "../TextButtonDropDown/TextButtonDropDown";


// type Estado = 'ocupada' | 'libre' | 'reservada';

type Props = {
    // estado: Estado,
    // nombre: string
}


const NavBarHome = (props: Props) => {
    return (
        // <span className="bg-red-200">asdasdasd</span>
        <div className="bg-red-400" onClick={() => {
            console.log("montes es mi perra")
        }}>

            <TextButtonDropButton title={"asd"} value={123} />
        </div>
    )
}

export default NavBarHome