import { Box, Button, Container, Grid } from '@chakra-ui/react';
import React from 'react';

import logo from '../../assets/404.png';


const Error404 = () => {
    return (
        <div className=' h-full items-center justify-center'>
            <div className='flex justify-center
             h-[30%]
                items-end pb-10
                text-6xl font-bold
                font-arial
                text-primario
                '>
                No Disponible ...
            </div>
            <div className='flex justify-center  h-[40%] items-center '>
                <img src={logo} alt="Logo" />
            </div>
            <div className='
                flex justify-center
                h-[30%] items-start
                text-6xl font-bold
                font-arial
                text-primario
            '>
                Próximamente! :D
            </div>

        </div>
    );
}

export default Error404