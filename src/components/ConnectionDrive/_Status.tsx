import cntl from "cntl";
import { ConnectionDriveStatus } from "../../constants/enums/connection_drive_status";

import ReactLoading from "react-loading";
import { Spinner } from '@chakra-ui/react'
import { FaGoogleDrive } from "react-icons/fa";

type StatusType = {
    connectionStatus: ConnectionDriveStatus,
}

const _Status = (status: StatusType) => {

    let _label = "";
    let _colorStatus = "";
    let _textColor = "text-background_main"
    let _showLoading = false;

    switch (status.connectionStatus) {
        case ConnectionDriveStatus.FailedToSync:
            _label = "Error al Sincronizar";
            _colorStatus = "bg-rojo_suave";
            break;
        case ConnectionDriveStatus.NoUrl:
            _label = "Conectar con Drive";
            _colorStatus = "bg-oscuro";
            break;
        case ConnectionDriveStatus.Retrying:
            _label = "REINTENTANDO ...";
            _colorStatus = "bg-amarillo_suave";
            _textColor = "text-primario"
            _showLoading = true;
            break;
        case ConnectionDriveStatus.Synchronized:
            _label = "Sincronizado";
            _colorStatus = "bg-verde";
            break;
        case ConnectionDriveStatus.Synchronizing:
            _label = "Sincronizando ...";
            _colorStatus = "bg-amarillo_suave";
            _textColor = "text-primario";
            _showLoading = true;
            break;
        default:
            _label = "Error Desconocido";
            _colorStatus = "bg-oscuro";
            break;
    }

    return (
        <div className={
            cntl`
            ${_colorStatus}
            ${_textColor}
            py-2 px-5 text-sm
            font-semibold
            flex items-center
            `}>
            <FaGoogleDrive className="inline-block mr-5 scale-125 text-background_main" />
            <span className="mx-auto">{_label}</span>
            <Spinner className={`scale-[0.1] ${_showLoading ? '' : 'invisible'}`} />
        </div>
    );
}

export default _Status;