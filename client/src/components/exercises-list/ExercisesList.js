import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExercises } from '../../actions/exercises';
import Spinner from '../layout/Spinner';
import ExerciseItem from './ExerciseItem';
import FilterUsers from './FilterUsers';
import Pagination from './Pagination';

const ExercisesList = () => {
  const dispatch = useDispatch();
  const exercisesState = useSelector(state => state.exercises);
  const { loading, exercises } = exercisesState;

  // Pagination Variables
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if(exercises.length === 0) dispatch(getExercises());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaginate = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
    getPagination();
  }

  // Calculate total number of pages required + items on each page
  const getPagination = () => {
    // Pagination Actions
    let indexOfLastPage = currentPage * itemsPerPage;
    let indexOfFirstPage = indexOfLastPage - itemsPerPage;
    let currentExercises = exercises.slice(indexOfFirstPage, indexOfLastPage);

    let pageNumber = [];
    for(let i = 1; i <= Math.ceil(exercises.length / itemsPerPage); i++){
      pageNumber.push(i);
    }

    return { currentExercises, pageNumber };
  }

  const paginationValues = getPagination();
  const { currentExercises, pageNumber } = paginationValues;

  return loading ? (<Spinner />) : (
    <div>
      <h2>Logged Exercises</h2>
      <FilterUsers />
      <Pagination currentPage={currentPage} pageNumber={pageNumber} paginate={handlePaginate} />
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
          {currentExercises.length > 0 && currentExercises.map(exercise => (
          <ExerciseItem exercise={exercise} key={exercise._id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ExercisesList
