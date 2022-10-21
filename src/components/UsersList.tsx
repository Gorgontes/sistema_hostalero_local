import { Button, ButtonGroup, List, ListItem } from '@chakra-ui/react';
import { useState } from 'react';
type Props = {}

const UsersList = (props: Props) => {
  const [usuarios, setUsuarios] = useState([])
  const getUsers = async () => {
    const res = await window.Main.users.getUsers();
    setUsuarios(res);
    console.log('finalizo');
  }
  return (
    <div>
      <h1>Lista de usuarios</h1>
      <Button onClick={getUsers}>Listar Usuarios</Button>
      <List>
        {
          usuarios.map((usuario:any) => (
            <ListItem>{usuario.name}</ListItem>
          ))
        }
      </List>
    </div>
  )
}

export default UsersList