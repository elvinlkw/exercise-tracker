import {
  GET_USERS
} from '../actions/types';

const initialState = {
  users: [],
  loading: true
}

const userReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch(type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: payload
      }
    default: 
      return state;
  }
}

export default userReducer;