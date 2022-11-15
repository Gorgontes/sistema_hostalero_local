import cntl from "cntl";
import React, { useState } from "react";
import ItemDropButton from "../ItemDropDown/ItemDropDown";

type Props = {
    label: string;
    items: Array<{
        label: string;
        url: string;
    }>;
};

const ButtonDropDown = (props: Props) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div className="dropdown relative inline-block">
            <button
                className="dropbtn hover:bg-background_main hover:text-primario text-background_main py-2 px-5 text-sm"
                onMouseEnter={() => {
                    setIsHover(true);
                }}
                onMouseLeave={() => {
                    setIsHover(false);
                }}
            >
                {props.label}
            </button>
            <div
                onMouseEnter={() => {
                    setIsHover(true);
                }}
                onMouseLeave={() => {
                    setIsHover(false);
                }}
                className={cntl`
                    absolute z-10 min-w-[160px]
                    bg-background_main border-b-[5px]
                    border-primario rounded-b-lg
                    shadow-lg
                    text-primario ${isHover ? "block" : "hidden"}`}
            >
                {props.items.map((json, index) => {
                    return (
                        <ItemDropButton key={index} label={json.label} url={json.url} />
                    );
                })}
            </div>
        </div>
    );
};

export default ButtonDropDown;

///
// type Props = {
//     title: String,
//     value: number,
//     children?: JSX.Element | JSX.Element[];
//     // links: [

//     // ]
// }

// const ButtonDropDown = ({ title, value, children }: Props) => {
