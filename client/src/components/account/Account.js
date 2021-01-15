import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditAccount from './EditAccount';
import { deleteAccount } from '../../actions/auth';

const Account = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  return (
    <div>
      <h3>Your Account</h3>
      <EditAccount />
      <hr className="col-md-6 ml-0"/>
      <div className="form-group clearfix">
        <button type="button" className="btn btn-danger" onClick={e =>{
          e.preventDefault();
          if(window.confirm('Are you sure you want to delete your account? This operation cannot be reverted!')) {
            dispatch(deleteAccount(auth.user._id));
          }
        }}>Delete Account</button>
      </div>
    </div>
  )
}

export default Account;