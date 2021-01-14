import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteUser, changeMode } from '../../actions/users';

const UserItem = ({
  user: {
    username,
    createdAt,
    _id,
    index
  }
}) => {
  const dispatch = useDispatch();
  return (
    <tr>
      <td>{index+1}</td>
      <td>{username}</td>
      <td>{moment(createdAt, "YYYY-MM-DD").format("YYYY-MM-DD")}</td>
      <td>
        <button type="button" className="btn btn-primary mr-1" onClick={() => dispatch(changeMode(1, {username, _id}))}>Edit</button>
        <button type="button" className="btn btn-danger" onClick={() => dispatch(deleteUser(_id))} >Delete</button>
      </td>
    </tr>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem
