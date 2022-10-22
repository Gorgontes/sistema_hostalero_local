import { Button, ButtonGroup, List, ListItem } from '@chakra-ui/react';
import { useState } from 'react';
import { fetchUsers } from '../api/User';
import { useQuery } from '@tanstack/react-query';
type Props = {}

const UsersList = (props: Props) => {
  const { isLoading, isError, data } = useQuery(['users'], fetchUsers);

  if(isLoading)
    return (<div>Loading...</div>);

  if(isError)
    return (<div>Hubo un error al cargar datos</div>);

  return (
    <div>
      <h1>Lista de usuarios</h1>
      <List>
        {
          data!.map((usuario:any) => (
            <ListItem key={usuario.name}>{usuario.name}</ListItem>
          ))
        }
      </List>
    </div>
  )
}

export default UsersList