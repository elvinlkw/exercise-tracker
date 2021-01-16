import {
  CREATE_USER,
  GET_USERS,
  DELETE_USER,
  CHANGE_MODE,
  UPDATE_FILTER,
  CLEAR_FILTER
} from '../actions/types';

const initialState = {
  users: [],
  loading: true,
  user: {},
  user_loading: true,
  edit_mode: 0,
  edit_user: null,
}

const userReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch(type) {
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: payload.map(user => ({ ...user, checked: false })),
      }
    case CREATE_USER:
      return {
        ...state, 
        users: [...state.users, { ...payload, checked: false }],
      }
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== payload),
      }
    case CHANGE_MODE:
      return {
        ...state,
        edit_mode: payload.mode,
        edit_user: payload.user
      }
    case UPDATE_FILTER:
      return {
        ...state,
        users: [...state.users].map(user => {
          if(user.username === payload.username) return { ...user, checked: payload.checked };
          else return user;
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        users: [...state.users].map(user => ({ ...user, checked: false }))
      }
    default: 
      return state;
  }
}

export default userReducer;