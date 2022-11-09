import React from "react";
import './style.css'
type Props = {
    title: String,
    value: number
}



const TextButtonDropButton = ({ title, value }: Props) => {

    return (
        <>
            {/* <div className="dropdown"> */}
            <div className="relative inline-block">
                <button className="dropbtn">Dropdown</button>
                {/* <div className="dropdown-content"> */}
                <div className="absolute hidden">
                    <a href="#" className="">Link 1</a>
                    <a href="#" className="">Link 2</a>
                    <a href="#" className="">Link 3</a>
                </div>
            </div>
        </>
    )
}

export default TextButtonDropButton