import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import {
    Button,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    StackDivider,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPisosAndHab } from "../../api/Habitacion";
import Piso from "../../components/Habitaciones/Piso";


const Reportes = () => {
    const [valor, setValor] = useState(0);

    return (
        <div className="h-full bg-blue-500" onClick={() => {
            setValor(valor + 1);
            console.log(valor);
        }}>
            <div>{valor}</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>text</div>
            <div>pruebaaa</div>
            <div>pruebaaa</div>
            <div>pruebaaa</div>
            <div>pruebaaa</div>
            <div>pruebaaa</div>
        </div>
    );
}


export default Reportes