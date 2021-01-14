import React from 'react';
import { useSelector } from 'react-redux';
import ListUsers from './ListUsers';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

const Users = () => {
  const edit_mode = useSelector(state => state.users.edit_mode);
  return (
    <div>
      <ListUsers />
      {edit_mode ? <EditUser /> : <CreateUser />}
    </div>
  )
}

export default Users
