import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

import { ConnectionDriveStatus } from "../../constants/enums/connection_drive_status";
import _ModalDescription from "./_ModalDescription";
import _ModalLogoAndTitle from "./_ModalLogoAndTitle";
import _Status from "./_Status";

const _currentStatus = ConnectionDriveStatus.NoUrl;
// const _currentStatus = ConnectionDriveStatus.NoUrl;
// const _currentStatus = ConnectionDriveStatus.Synchronized;


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
                    <ModalBody >
                        <_ModalLogoAndTitle />
                        <Input className="my-5 text-center" placeholder='https://google.com.drive/' size='md' />
                        <_ModalDescription />
                    </ModalBody>

                    <ModalFooter className="mx-auto">
                        <Button colorScheme='green' variant='solid' mr={3} onClick={onClose}>
                            Sincronizar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
}

export default ConnectionDrive;