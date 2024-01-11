import React from 'react';
import '../App.css';
import './css/MainHeader.css';
import {  useNavigate } from 'react-router-dom';


const MainHeader = () => {
  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token')
    navigate('/')

  }
  return (
    <>
      <div className='container-fluid'>
        <div className='row d-flex fixed-top bg-white'>
          <div className='col-md-4 col-sm-6'>
            <img
              src="/images/logo.webp"
              alt=""
            />
          </div>
          <div className='col-md-4 col-sm-6'>
            <p>Your Text or anything</p>
          </div>
          <div className='col-md-4 col-sm-12 mt-3'>
            <div className='logout-btn'>
              <button className='button' onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
