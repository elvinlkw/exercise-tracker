import {
  SET_EXERCISES,
  EXERCISE_ERROR,
  REMOVE_EXERCISE,
  CREATE_EXERCISE
} from "../actions/types";

const initialState = {
  exercises: [],
  loading: true,
  exercise: {},
}

const exercisesReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch(type) {
    case SET_EXERCISES:
      return {
        ...state,
        loading: false,
        exercises: payload
      }
    case CREATE_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, payload]
      }
    case REMOVE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(exercise => exercise._id !== payload)
      }
    case EXERCISE_ERROR:
      return {
        ...state,
        exercises: [],
        loading: false,
        exercise: {}
      }
    default:
      return state;
  }
}

export default exercisesReducer;