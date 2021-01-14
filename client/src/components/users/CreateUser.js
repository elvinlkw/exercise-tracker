import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../actions/users';

const CreateUser = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(createUser(username.trim()));
    setUsername('');
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text" required className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default CreateUser;