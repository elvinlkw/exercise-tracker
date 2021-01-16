import React, { useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, updateFilter } from '../../actions/users';
import { getExercises } from '../../actions/exercises';

const FilterUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(state => state.users);
  const [showAll, toggleShowAll] = useState('showAll');

  useEffect(() => {
    if( loading && showAll === 'showSelected' ) {
      dispatch(getUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll]);

  useEffect(() => {
    if(users.length !== 0) {
      // construct request param
      let users_param = users.filter(user => user.checked === true );
      users_param = users_param.map(user => user._id).join('--');
      dispatch(getExercises(users_param));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])

  const handleCheckbox = e => {
    dispatch(updateFilter(e.target.value, e.target.checked, users));
  }

  return (
    <Fragment>
      <div className="mt-3 mb-2">
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" id="show_all" value="showAll" checked={showAll === 'showAll'} onChange={e => toggleShowAll(e.target.value)} />
          <label className="form-check-label" htmlFor="show_all" style={style} >Show All Users</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" id="show_selected" value="showSelected" checked={showAll === 'showSelected'} onChange={e => toggleShowAll(e.target.value)} />
          <label className="form-check-label" htmlFor="show_selected" style={style} >Selected Users</label>
        </div>
      </div>
      {showAll === 'showSelected' && 
      <div className="mb-3">
        {!loading && users !== null && users.length > 0 && users.map(user => (
        <div className="form-check form-check-inline" key={user._id}>
          <input className="form-check-input" type="checkbox" id={`user_${user._id}`} value={user.username} defaultChecked={false} onChange={handleCheckbox} />
          <label className="form-check-label" htmlFor={`user_${user._id}`} style={style} >{user.username}</label>
        </div>
        ))}
      </div>}
    </Fragment>
  )
}

const style = {
  userSelect: 'none'
}

export default FilterUsers
