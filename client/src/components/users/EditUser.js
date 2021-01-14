import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, changeMode } from '../../actions/users';

const EditUser = () => {
  const dispatch = useDispatch();
  const edit_user = useSelector(state => state.users.edit_user);
  const [username, setUsername] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(editUser(edit_user._id, username.trim()));
    setUsername('');
    dispatch(changeMode(0, null));
  }

  useEffect(() => {
    if(edit_user !== null) {
      setUsername(edit_user.username);
    }
  }, [edit_user])

  return (
    <div>
      <h3>Edit User {edit_user.username}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input type="text" required className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <div className="btn btn-danger mr-2" onClick={() => dispatch(changeMode(0, null))}>Cancel</div>
          <input type="submit" value="Edit User" className="btn btn-success" />
        </div>
      </form>
    </div>
  )
}

export default EditUser;