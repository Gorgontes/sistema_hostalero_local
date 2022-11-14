import React from "react";
import TextButtonDropButton from "../ButtonDropDown/ButtonDropDown";


// type Estado = 'ocupada' | 'libre' | 'reservada';

type Props = {
    // estado: Estado,
    // nombre: string
}

const datae = [
    "asdasd",
    "asdasd",
    "asdasd"
]

const NavBarHome = (props: Props) => {
    return (
        // <span className="bg-red-200">asdasdasd</span>
        <div className="bg-red-400" onClick={() => {
            console.log("montes es mi perra")
        }}>

            <TextButtonDropButton title={"asd"} value={123} >
                {

                    datae.map((text) => {
                        return (<a key={text}> {text} </a>)
                    })
                }

            </TextButtonDropButton>
            <TextButtonDropButton title={"asd"} value={123} >
                <a> asdlkj </a>
                <a> abcde </a>
                <a> asdlkj </a>
            </TextButtonDropButton>
        </div >
    )
}

export default NavBarHome