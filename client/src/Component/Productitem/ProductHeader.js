import React from "react";
import { useNavigate } from 'react-router-dom';

const ProductHeader = ({ count }) => {
  const navigate = useNavigate();

  const handleViewCart = () => {
    navigate('/CartItemPage');
  };

  return (
    <div className='Navmaincontain d-flex'>

<div style={{ fontWeight: 600, fontSize: '21px', textAlign: 'right' }}>
        Total Cart Item: {count}
      </div>
      <div >
        <button className='button' onClick={handleViewCart}>
          View Cart
        </button>
      </div>
      
    </div>
  );
};

export default ProductHeader;
