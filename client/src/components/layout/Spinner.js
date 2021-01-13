import React, { Fragment } from 'react'
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <Fragment>
      <img style={style} src={spinner} alt="Loading..."/>
    </Fragment>
  )
}

const style = {
  position: 'fixed',
  width: '70px',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

export default Spinner
