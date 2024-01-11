import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MainHeader from "./MainHeader";
import ProductHeader from "./Productitem/ProductHeader";
import { useNavigate } from 'react-router-dom';




const SingleProductPage = () => {
  const { id } = useParams();
  //console.log(id)
  const [dataList, setDataList] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [CartItemlist, setCartItemlist] = useState([]);
  const userId = localStorage.getItem("UserId");
  const [filteredCartItems, setFilteredCartItems] = useState([]);
  const navigate = useNavigate();




  const handleQuantityIncrement = (id) => {
    setQuantities({
      ...quantities,
      [id]: (quantities[id] || 0) + 1,
    });
  };

  const handleQuantityDecrement = (id) => {
    if (quantities[id] > 0) {
      setQuantities({
        ...quantities,
        [id]: quantities[id] - 1,
      });
    }
  };

  const handleQuantityChange = (id, event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setQuantities({
      ...quantities,
      [id]: value,
    });
  };


  const handleAddToCart = (itemId) => {
    const item = dataList.find((item) => item.id === itemId);
    var Quantity = 0;
    var UserId = JSON.parse(localStorage.getItem('UserId'));
    if (item && item.IsSale) {
      Quantity = quantities[itemId] * 2;
    } else if (item) {
      Quantity = quantities[itemId];
    }
    if (Quantity > 0) {
      var response = axios.post('http://localhost:8080/api/user/createCartItems', { Quantity, UserId, itemId });
      console.log("response is", response);
      if (response) {
        setTotalItemCount(totalItemCount + 1);
        alert("data inserted");
      }
    } else {
      alert("Please enter a quantity greater than 0.");
    }
  };

  const fetchData = async (req, res) => {
    try {


      const response = await axios.get(`http://localhost:8080/api/user/SingleProduct/${id}`);
      //console.log(response.data.product)
      if (response.status === 200) {
        setDataList(response.data.product);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(dataList)

  const FetchCartItemData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/getCartItems");
      if (response.status === 200) {
        setCartItemlist(response.data.CartItems[0] || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleContinueShopping = () => {
    navigate('/Product');
  };


  useEffect(() => {
    fetchData();
    FetchCartItemData();

  }, [id]);
  useEffect(() => {

    const filteredItems = CartItemlist.filter((item) => item.userId === parseInt(userId));
    setFilteredCartItems(filteredItems);
    setTotalItemCount(filteredItems.length);
  }, [userId, CartItemlist]);

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12 text-center mt-5'>
            <MainHeader count={totalItemCount} />
          </div>

        </div>
        <div className='row'>
          <div className='col-md-6 text-center mt-1'>
            <ProductHeader count={totalItemCount} />
          </div>
          <div className='col-md-6 mt-5  bg-white p-3 justify-content-center' style={{ borderRadius: '9px' }}>
            <button className='button' onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>


        </div>

        {dataList?.map((item) => (
          <div key={item.id} className='row bg-white mt-2'>
            <div className='col-md-6 mt-5' style={{ padding: '100px' }}>
              <img
                src={item.imageURL}
                alt={item.name}
                style={{ height: '300px', width: '300px' }}
              />
            </div>
            <div className='col-md-6 mt-5' style={{ padding: '100px' }}>
              <p><b>Name:</b> {item.name}</p>
              <p><b>Description:</b> {item.Description}</p>

              <div>
                <p style={{ textDecoration: item.IsSale ? 'line-through' : 'none' }}>
                  {item.IsSale ? (
                    <span style={{ color: 'red', fontWeight: '600' }}>Original Price: {item.Price}</span>
                  ) : (
                    <span style={{ fontWeight: '600' }}>Price: {item.Price}</span>
                  )}
                </p>
                {item.IsSale ? (
                  <p style={{ color: 'green', fontWeight: '600' }}>Sale Price: {item.Price / 2}</p>
                ) : ""}
              </div>

              <div className=" mt-3">
                {quantities[item.id] >= 0 ? (
                  <>
                    <button className='Quantitybutton' onClick={() => handleQuantityDecrement(item.id)}>-</button>
                    <span className=''>
                      <input
                        type="Number"
                        value={quantities[item.id] || 0}
                        onChange={(e) => handleQuantityChange(item.id, e)}
                        name="Quantity"
                        style={{width:'20%'}}
                      />
                    </span>
                    <button className='Quantitybutton' onClick={() => handleQuantityIncrement(item.id)}>+</button>
                  </>
                ) : (
                  <span>
                    <input
                      className=''
                      type="number"
                      value={quantities[item.id] || 0}
                      onChange={(e) => handleQuantityChange(item.id, e)}
                      name="Quantity"
                      style={{width:'20%'}}
                    />
                    <button className='Quantitybutton' onClick={() => handleQuantityIncrement(item.id)}>+</button>
                  </span>
                )}
              </div>

              <div className='mt-2'>
                <button className='button' onClick={() => handleAddToCart(item.id)} disabled={quantities[item.id] <= 0}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>



  );
};

export default SingleProductPage;
