import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

import { ConnectionDriveStatus } from "../../constants/enums/connection_drive_status";
import _ModalDescription from "./_ModalDescription";
import _ModalLogoAndTitle from "./_ModalLogoAndTitle";
import _Status from "./_Status";

const _currentStatus = ConnectionDriveStatus.NoUrl;
// const _currentStatus = ConnectionDriveStatus.NoUrl;
// const _currentStatus = ConnectionDriveStatus.Synchronized;

// const { google } = require('googleapis');



const ConnectionDrive = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div className="relative ml-auto min-w-[350px] text-sm" onClick={() => {
            onOpen()
            console.log("abriendo o cerrando")
            console.log(onOpen)
        }}>
            <_Status connectionStatus={_currentStatus} />


            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent width={1000} className="!max-w-none">
                    <ModalHeader className="bg-primario text-background_main">Sincronizar con Google Drive</ModalHeader>
                    <ModalCloseButton className="!bg-rojo_suave text-background_main hover:bg-white" />
                    <ModalBody className="">
                        <_ModalLogoAndTitle />
                        <Input className="my-5 text-center" placeholder='https://google.com.drive/' size='md' />
                        <div className="max-w-[350px] mx-auto ">
                            <Input className="my-5 text-center " placeholder='Nombre de Hoja' size='md' />
                        </div>
                        <_ModalDescription />
                    </ModalBody>
                    <ModalFooter className="mx-auto">
                        <Button colorScheme='green' variant='solid' mr={3} onClick={() => {
                            console.log("probando")
                            window.Main.googleapi.sincronizar();
                            // onClose();
                        }
                        }>
                            Sincronizar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
}

export default ConnectionDrive;


// async function sincronizar() {
//     const authClient = await authorize();
//     const request = {
//         // The ID of the spreadsheet to update.
//         spreadsheetId: 'my-spreadsheet-id',  // TODO: Update placeholder value.

//         // The A1 notation of the values to update.
//         range: 'my-range',  // TODO: Update placeholder value.

//         // How the input data should be interpreted.
//         valueInputOption: '',  // TODO: Update placeholder value.

//         resource: {
//             // TODO: Add desired properties to the request body. All existing properties
//             // will be replaced.
//         },

//         auth: authClient,
//     };

//     try {
//         const response = (await sheets.spreadsheets.values.update(request)).data;
//         // TODO: Change code below to process the `response` object:
//         console.log(JSON.stringify(response, null, 2));
//     } catch (err) {
//         console.error(err);
//     }
// }

// async function authorize() {
//     // TODO: Change placeholder below to generate authentication credentials. See
//     // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
//     //
//     // Authorize using one of the following scopes:
//     //   'https://www.googleapis.com/auth/drive'
//     //   'https://www.googleapis.com/auth/drive.file'
//     //   'https://www.googleapis.com/auth/spreadsheets'
//     let authClient = null;

//     if (authClient == null) {
//         throw Error('authentication failed');
//     }

//     return authClient;
// }