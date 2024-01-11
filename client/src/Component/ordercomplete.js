import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderComplete = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/Product');
  };

  return (
    <>
   <div className='container-fluid'>
  <div className='bg-white row' style={{ height: '700px' }}>
    <div className='col-md-12 d-flex align-items-center justify-content-center'>
      <div className='align-items-center justify-content-center'>
        <div>
        <b>Order Complete</b>

        </div>
        <div>
        <button className='button' onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        </div>
       
      </div>
    </div>
  </div>
</div>

    </>
    
  );
};

export default OrderComplete;
