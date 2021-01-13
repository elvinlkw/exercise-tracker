import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteExercise } from '../../actions/exercises';

const ExerciseItem = ({
  exercise: {
    _id,
    username,
    description,
    duration,
    date
  }
}) => {
  const dispatch = useDispatch();
  return (
    <tr key={_id}>
      <td>{username}</td>
      <td>{description}</td>
      <td>{duration}</td>
      <td><Moment format="YYYY/MM/DD">{date}</Moment></td>
      <td>
        <Link to={`/exercise/edit/${_id}`} type="button" className="btn btn-primary mr-1">Edit</Link>
        <button type="button" className="btn btn-danger" onClick={e => {
          e.preventDefault();
          dispatch(deleteExercise(_id));
        }}>Delete</button>
      </td>
    </tr> 
  )
}

export default ExerciseItem;