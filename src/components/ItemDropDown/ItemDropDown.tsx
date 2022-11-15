import React from "react";
type Props = {
    label: string,
    url: string,
}

const ItemDropButton = ({ label, url }: Props) => {

    return (

        <div >
            <a
                className="pt-2 pb-2 pl-4 pr-4 hover:bg-primario hover:text-background_main rounded-b-lg"
                href={url}> {label}
            </a>
        </div>

    )
}

export default ItemDropButton