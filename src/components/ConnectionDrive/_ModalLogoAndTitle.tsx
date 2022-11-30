import cntl from "cntl";
import { FaGoogleDrive } from 'react-icons/fa';

import ReactLoading from "react-loading";
import { Spinner } from '@chakra-ui/react'

type StatusType = {
}

const _ModalLogoAndTitle = (status: StatusType) => {


    return (
        <div className={
            cntl`
            py-2 px-5 text-sm
            font-semibold
            flex
            flex-col
            items-center
            `}>
            {/* flex items-center */}
            <FaGoogleDrive className="text-primario" size="120" />
            <span className="text-primario text-[50px]">Inserta un Enlace</span>
        </div>
    );
}

export default _ModalLogoAndTitle;