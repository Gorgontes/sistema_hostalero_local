import { Button, ButtonGroup, List, ListItem } from '@chakra-ui/react';
import { useState } from 'react';
import { fetchUsers } from '../api/User';
import { useQuery } from '@tanstack/react-query';
type Props = {}

const UsersList = (props: Props) => {
  const res = useQuery(['users'], fetchUsers);
  // const res = useQuery(['users'], () => []);
  console.log(res);
  if(res.isLoading)
    return (<div>Loading...</div>);
  if(res.isError)
    return (<div>Hubo un error al cargar datos</div>);
  console.log('this is data suposedly',res.data);
  return (
    <div>
      <h1>Lista de usuarios</h1>
      <List>
        {
          res.data!.map((usuario:any) => (
            <ListItem key={usuario.name}>{usuario.name}</ListItem>
          ))
        }
      </List>
    </div>
  )
}

export default UsersList