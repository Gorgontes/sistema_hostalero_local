import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import { Card, CardHeader, CardBody, CardFooter, Heading, Stack, StackDivider, Box, Text, Button } from '@chakra-ui/react'
import BcCheckbox from '../../basic_components/BcCheckbox';
import BcStateRoom from '../../basic_components/BcStateRoom';
import BcTextAndCount from '../../basic_components/BcTextAndCount';
import { BasicStateRoom } from '../../constants/enums/BasicStateRoom';

const _Filtros = () => {

    const countOfFiltersApplied = 55;

    return (
        <div className="shadow-lg my-3 rounded-lg">

            <Card >
                <CardHeader>
                    <Heading size='sm' className='text-center text-primario'>Filtros</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4' className=''>
                        <Box className='divide-y'>
                            <Heading className='py-3 text-center flex' size='xs'>

                                <div>Filtros ({countOfFiltersApplied})</div>
                                <Button
                                    rightIcon={<CloseIcon />}
                                    colorScheme='teal'
                                    variant='outline'
                                    size="sm"
                                    borderRadius='20px'
                                    className='ml-auto'>
                                    Limpiar
                                </Button>
                            </Heading>
                            {/* <Heading className='py-3 text-center' size='xs'> */}
                            <div className='py-3 text-center'>
                                <BcTextAndCount label='Baños Privados' count={"5"} />
                                <BcTextAndCount label='Camas' count={"8"} />
                                <BcCheckbox
                                    label='Tv'
                                    isActive={false}
                                />
                                <BcCheckbox
                                    label='Wifi'
                                    isActive={true}
                                />
                            </div>

                            <Button
                                colorScheme='blue'
                                size="md"
                                className=''>
                                Aplicar
                            </Button>

                            {/* </Heading> */}

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


export default _Filtros;