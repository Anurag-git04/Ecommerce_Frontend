import React, { useContext, useEffect } from 'react';
import ProductContext from '../contexts/ProductContext';
import { NavLink } from 'react-router-dom';


const SuccessTick = () => {
  const {setallclear} = useContext(ProductContext)
  useEffect(()=>{
    setallclear()
  },[])
  return (
    <div className="container d-flex justify-content-center align-items-center flex-column" style={{ height: '80vh' }}>
      <h4 className="text-success mb-4">✅ ORDER PLACED SUCCESSFULLY</h4>
      <NavLink to='/' className="btn btn-secondary">
        Go to Home
      </NavLink>
    </div>
  );
};

export default SuccessTick;
