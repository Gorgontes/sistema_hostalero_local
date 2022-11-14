import React from "react";
type Props = {
    title: String,
    value: number,
    children?: JSX.Element | JSX.Element[];
    // links: [

    // ]
}

const ItemDropButton = ({ title, value, children }: Props) => {

    return (
        <>
            <div className="dropdown">
                <button className="dropbtn">Dropdown</button>
                <div className="dropdown-content">
                    {children}
                    {/* <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a> */}
                </div>
            </div>
        </>
    )
}

export default ItemDropButton