import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { MouseEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postUser } from '../api/User';

type Props = {}

const UserForm = (props: Props) => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const mutation = useMutation(postUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })
  const addUser = (event: MouseEvent) => {
    mutation.mutate({
      email,
      name: username
    })
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