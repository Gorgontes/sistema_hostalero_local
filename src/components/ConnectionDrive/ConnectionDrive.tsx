import { ConnectionDriveStatus } from "../../constants/enums/connection_drive_status";
import _Status from "./_Status";

const _currentStatus = ConnectionDriveStatus.NoUrl;
// const _currentStatus = ConnectionDriveStatus.NoUrl;
// const _currentStatus = ConnectionDriveStatus.Synchronized;


const ConnectionDrive = () => {
    return (
        <div className="relative ml-auto min-w-[350px] text-sm" onClick={() => {
            console.log('asdasd')
        }}>
            <_Status connectionStatus={_currentStatus} />
        </div>
    );
}

export default ConnectionDrive;