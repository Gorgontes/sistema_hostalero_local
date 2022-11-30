import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box, Text } from '@chakra-ui/react'
import BcStateRoom from '../../basic_components/BcStateRoom';

import { BasicStateRoom } from '../../constants/enums/BasicStateRoom';

const _EstadosHabitaciones = () => {
    return (
        <div className='shadow-lg my-3 rounded-lg'>

            <Card >
                <CardHeader>
                    <Heading size='sm' className='text-center text-primario'>Estados de habitaciones</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4' className=''>
                        <Box className='divide-y'>
                            <Heading className='py-3 text-center' size='xs'>
                                <BcStateRoom
                                    label='Libre'
                                    count={10}
                                    typeIcon={BasicStateRoom.free}
                                />
                            </Heading>
                            <Heading className='py-3 text-center' size='xs'>
                                <BcStateRoom
                                    label='Reservado'
                                    count={5}
                                    typeIcon={BasicStateRoom.reserved}
                                />
                            </Heading>
                            <Heading className='py-3 text-center' size='xs'>
                                <BcStateRoom
                                    label='Ocupado'
                                    count={8}
                                    typeIcon={BasicStateRoom.occupied}
                                />
                            </Heading>
                            {/* <Text pt='2' fontSize='sm'>
                                View a summary of all your clients over the last month.
                            </Text> */}
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        </div>
    );
}


export default _EstadosHabitaciones;