import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';
import { getUsers } from '../../actions/users';

const ListUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.users);
  const exercises = useSelector(state => state.exercises);

  useEffect(() => {
    if(loading) {
      dispatch(getUsers());
    }
  }, [loading, dispatch]);

  // useEffect(() => {
  //   if(!loading && !exercises.loading) {
  //     // for each user, check each exercises
  //     // if exercise username matches user, add to user and remove from copy variable
  //     let cp_exercises = [...exercises.exercises];
  //     users.forEach(user => {
  //       let index = 0;
  //       let endIndex = cp_exercises.length - 1;
  //       let temp = {...user, exercises: 0, duration: 0};
        
  //       while(index <= endIndex) {
  //         if(cp_exercises[index].username === user.username) {
  //           temp.exercises += 1;
  //           temp.duration += cp_exercises[index].duration;
  //           cp_exercises.splice(index, 1);
  //           endIndex -= 1;
  //         } else {
  //           index += 1;
  //         }
  //       }
  //       // Add to the array
  //       setUserData(userData => [...userData, temp]);
  //     });
  //     setLoading(false);
  //   }
  // }, [loading, exercises.loading]);

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [users]);

  return loading && exercises.loading ? (<Spinner />) : (
    <div>
      <h3>Users List</h3>
      <table className="table">
        <thead>
          <tr className="table-warning">
            <th scooe="col"></th>
            <th scope="col">Username</th>
            <th scope="col">Date Added</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserItem key={user._id} user={{...user, index}} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListUsers
