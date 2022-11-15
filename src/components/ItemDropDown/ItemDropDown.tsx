import React from "react";
type Props = {
    label: string;
    url: string;
};

const ItemDropButton = ({ label, url }: Props) => {
    return (
        <a
            className="py-2 px-4 hover:bg-primario hover:text-background_main rounded-sm block"
            href={url}
        >
            {" "} {label}
        </a>
    );
};

export default ItemDropButton;
