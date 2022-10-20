import React from 'react';
import {Button, ButtonGroup} from '@chakra-ui/react';
type Props = {}

const UsersList = (props: Props) => {
  return (
    <div>
      <h1>this is just text</h1>
      <Button onClick={() => console.log('no shot')}>Agregar</Button>
    </div>
  )
}

export default UsersList