import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExercises } from '../../actions/exercises';
import Spinner from '../layout/Spinner';
import ExerciseItem from './ExerciseItem';

const ExercisesList = () => {
  const dispatch = useDispatch();
  const exercisesState = useSelector(state => state.exercises);
  const { loading, exercises } = exercisesState;

  useEffect(() => {
    if(exercises.length === 0) dispatch(getExercises());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (<Spinner />) : (
    <div>
      <h2>Logged Exercises</h2>
      <table className="table">
        <thead>
          <tr className="table-info">
            <th scope="col">Username</th>
            <th scope="col">Description</th>
            <th scope="col">Duration</th>
            <th scope="col">Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.length > 0 && exercises.map(exercise => (
          <ExerciseItem exercise={exercise} key={exercise._id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExercisesList
