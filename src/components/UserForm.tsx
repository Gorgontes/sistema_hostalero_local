import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { MouseEvent, useState } from 'react';

type Props = {}

const UserForm = (props: Props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const addUser = (event: MouseEvent) => {
    window.Main.users.createUser({email, name: username})
    console.log(`email: ${email}; username: ${username}`)
  }
  return (
    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
      <FormLabel>Username</FormLabel>
      <Input value={username} onChange={e => setUsername(e.target.value)} />
      <Button leftIcon={<AddIcon/>} onClick={addUser}>Agregar</Button>
    </FormControl>
  )
}

export default UserForm