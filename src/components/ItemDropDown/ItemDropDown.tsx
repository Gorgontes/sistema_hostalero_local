import React from "react";
import { Link } from "react-router-dom";
type Props = {
  label: string;
  url: string;
};

const ItemDropButton = ({ label, url }: Props) => {
  return (
    <Link
      className="py-2 px-4 hover:bg-primario hover:text-background_main rounded-sm block"
    //   href={url}
      to={url}
    >
      {" "} {label}
    </Link>
  );
};

export default ItemDropButton;
