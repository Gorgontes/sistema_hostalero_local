import React from "react";
import ItemDropButton from "../ItemDropDown/ItemDropDown";
import './style.css'
type Props = {
    label: string,
    items: Array<{
        label: string,
        url: string
    }>
}

const ButtonDropDown = (props: Props) => {

    return (
        <div className="dropdown relative inline-block">
            <button className="dropbtn hover:bg-background_main hover:text-primario text-background_main py-2 px-5 text-sm">
                {props.label}
            </button>
            <div className="hidden dropdown-content bg-background_main border-b-2 border-primario rounded-b-lg shadow-lg text-primario">
                {
                    props.items.map((json, index) => {
                        return (
                            <ItemDropButton
                                key={index}
                                label={json.label}
                                url={json.url}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ButtonDropDown








///
// type Props = {
//     title: String,
//     value: number,
//     children?: JSX.Element | JSX.Element[];
//     // links: [

//     // ]
// }

// const ButtonDropDown = ({ title, value, children }: Props) => {