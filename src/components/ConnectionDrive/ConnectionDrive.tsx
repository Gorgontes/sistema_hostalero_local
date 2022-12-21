import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { ConnectionDriveStatus } from "../../constants/enums/connection_drive_status";
import _ModalDescription from "./_ModalDescription";
import _ModalLogoAndTitle from "./_ModalLogoAndTitle";
import _Status from "./_Status";

import { useState } from "react";

const _currentStatus = ConnectionDriveStatus.NoUrl;

const ConnectionDrive = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [url, setUrl] = useState("");
  const [nameSheet, setNameSheet] = useState("");
  return (
    <div
      className="relative ml-auto min-w-[350px] text-sm"
      onClick={() => {
        onOpen();
        console.log("abriendo o cerrando");
        console.log(onOpen);
      }}
    >
      <_Status connectionStatus={_currentStatus} />

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent width={1000} className="!max-w-none">
          <ModalHeader className="bg-primario text-background_main">
            Sincronizar con Google Drive
          </ModalHeader>
          <ModalCloseButton className="!bg-rojo_suave text-background_main hover:bg-white" />
          <ModalBody className="">
            <_ModalLogoAndTitle />
            <Input
              className="my-5 text-center"
              placeholder="https://google.com.drive/"
              size="md"
              onChange={(value) => {
                setUrl(value.target.value);
              }}
            />
            <div className="max-w-[350px] mx-auto ">
              <Input
                className="my-5 text-center "
                placeholder="Nombre de Hoja"
                size="md"
                onChange={(value) => {
                  setNameSheet(value.target.value);
                }}
              />
            </div>
            <_ModalDescription />
          </ModalBody>
          <ModalFooter className="mx-auto">
            <Button
              colorScheme="green"
              variant="solid"
              mr={3}
              onClick={() => {
                var matches = /\/([\w-_]{15,})\/(.*?gid=(\d+))?/.exec(url);
                if (matches == null) return;
                var _sheetID = matches[1];
                // window.Main.googleapi.sincronizar(_sheetID, nameSheet);
                window.Main.googleapi
                  .saveConfigDrive(_sheetID, nameSheet)
                  .finally(() => onClose());
                // onClose();
              }}
            >
              Guargar configuracion
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConnectionDrive;
