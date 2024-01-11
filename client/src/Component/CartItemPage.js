import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/cartitempage.css"; // Import your CSS file
import MainHeader from "./MainHeader";
import { useNavigate } from 'react-router-dom';

const CartItemPage = () => {
  const [cartItemList, setCartItemList] = useState([]);
  const [filteredCartItems, setFilteredCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);
  const [itemSalePrice, setItemSalePrice] = useState(0);



  const userId = localStorage.getItem("UserId");
  const navigate = useNavigate();

  const FetchCartItemData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/getCartItems");
      console.log(response.data.CartItems[0]);
      if (response.status === 200) {
        const cartItems = response.data.CartItems[0] || [];
        console.log(cartItems)
        // Initialize variables to calculate total values
        let totalQuantity = 0;
        let totalPrice = 0;
        let totalSalePrice = 0;


        cartItems.forEach(item => {
          totalQuantity += item.Quantity;
          totalPrice += parseInt(item.Price, 10) * item.Quantity;
          if (item.SalePrice > 0) {
            totalSalePrice += parseInt(item.SalePrice, 10) * item.Quantity;

          }


        });

        // Set the values in state
        setTotalItems(cartItems.length);
        setItemQuantity(totalQuantity);
        setItemPrice(totalPrice);
        setItemSalePrice(totalSalePrice);


        // Set the filtered cart items and quantities
        setFilteredCartItems(cartItems);
        const initialQuantities = {};
        cartItems.forEach(item => {
          initialQuantities[item.CartItemId] = item.Quantity;
        });
        setQuantities(initialQuantities);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateQuantityInDatabase = async (itemId, newQuantity) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/user/updateCartItemQuantity`, {
        id: itemId,
        Quantity: newQuantity,
      });

      console.log("Update quantity response:", response);

      if (response.status === 200) {
        // Update the local state after a successful API call
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [itemId]: newQuantity,
        }));
        FetchCartItemData();
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      console.log("Removing item with id:", id);

      const response = await axios.delete(`http://localhost:8080/api/user/RemoveCartItems`, {
        data: { id },
      });

      console.log("Delete response:", response);

      if (response.status === 200) {
        alert(response.data.message);

        setCartItemList((prevItems) => prevItems.filter((item) => item.CartItemId !== id));
        // Remove quantity from the state when an item is removed
        setQuantities((prevQuantities) => {
          const updatedQuantities = { ...prevQuantities };
          delete updatedQuantities[id];
          return updatedQuantities;
        });
        FetchCartItemData();
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (itemId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    // Update the quantity in the database and local state
    await updateQuantityInDatabase(itemId, newQuantity);
  };

  const handleQuantityDecrement = async (itemId) => {
    const currentQuantity = quantities[itemId] || 1;
    const newQuantity = Math.max(currentQuantity - 1, 0);
    // Update the quantity in the database and local state
    await updateQuantityInDatabase(itemId, newQuantity);
  };

  const handleQuantityIncrement = async (itemId) => {
    const currentQuantity = quantities[itemId] || 0;
    const newQuantity = currentQuantity + 1;
    // Update the quantity in the database and local state
    await updateQuantityInDatabase(itemId, newQuantity);
  };

  const handleCheckout = async () => {
    debugger;
    var TotalAmount = itemPrice - itemSalePrice;
    var userId = JSON.parse(localStorage.getItem('UserId'));
    var currentDate = new Date();
    var InvoiceDate = currentDate.toISOString().split('T')[0];

    console.log(TotalAmount, userId, InvoiceDate)
    var response = await axios.post('http://localhost:8080/api/user/invoice', { userId, TotalAmount, InvoiceDate })
    console.log("response is", response)
    if (response) {
      alert("payment Successful")

      const response = await axios.delete(`http://localhost:8080/api/user/RemoveAllCartItems`, {
        data: { userId },
      });

      if (response.status === 200) {
        navigate('/completeorder');
      }



    }
  };

  const handleContinueShopping = () => {
    navigate('/Product');
  };




  useEffect(() => {
    FetchCartItemData();
  }, []);

  useEffect(() => {
    setFilteredCartItems(cartItemList.filter((item) => item.userId === parseInt(userId)));
  }, [userId, cartItemList]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <MainHeader />
          </div>

          <div className="col-md-12 mt-md-5">
            <div className='Navmaincontain d-flex '>
              <div style={{ fontWeight: 600, fontSize: '21px', textAlign: 'right' }}>
                Total Cart Item: {filteredCartItems.length}
              </div>
              <div>
                <button className='button' onClick={handleContinueShopping}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="bg-white mt-2 p-2">
              <div className=" bg-white ">
              <table className="cart-table ">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCartItems.map((cartItem, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>
                          <img src={cartItem.imageURL} alt={cartItem.name} className="item-image" />
                        </td>
                        <td>{cartItem.name}</td>
                        <td>
                          <div>
                            <p style={{ textDecoration: cartItem.IsSale ? 'line-through' : 'none' }}>
                              {cartItem.IsSale ? (
                                <span style={{ color: 'red', fontWeight: '600' }}> Price: {cartItem.Price}</span>

                              ) : (
                                `Price: ${cartItem.Price}`
                              )}
                            </p>
                            {cartItem.IsSale ? (
                              <p style={{ color: 'green', fontWeight: '600' }}>Sale Price: {cartItem.Price / 2}</p>
                            ) : ""}
                          </div>
                        </td>
                        <td>
                          <div className="button-container">
                            <button className='Quantitybutton' onClick={() => handleQuantityDecrement(cartItem.CartItemId)}>-</button>
                            <span className='QuantityInput'>
                              <input
                                type="number"
                                value={quantities[cartItem.CartItemId] || 0}
                                onChange={(e) => handleQuantityChange(cartItem.CartItemId, e)}
                                name="Quantity"
                              />
                            </span>
                            <button className='Quantitybutton' onClick={() => handleQuantityIncrement(cartItem.CartItemId)}>+</button>
                          </div>
                        </td>
                        <td>
                          {(cartItem.Quantity || 0) * (cartItem.IsSale ? cartItem.SalePrice : cartItem.Price)}
                        </td>
                        <td>
                          <button onClick={() => handleRemove(cartItem.CartItemId)} className="button">
                            Remove
                          </button>
                        </td>
                      </tr>
                      {/* Add a horizontal line after every row */}
                      <tr>
                        <td colSpan="6">
                          <div className="horizontal-line"></div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              </div>
           
            </div>
          </div>

          <div className="col-md-12 mt-md-1 d-flex" style={{ height: '470px' }}>
            <div className="col-md-6 bg-white"></div>
            <div className="col-md-6 bg-white invoices p-3 ">
              <div className="mt-5" style={   { padding: '0px 0px 54px 111px' ,border: '1px solid'}}>
                <div className="pt-5">
                  <b>TotalItems:</b>
                  <span>{totalItems}</span>
                </div>
                <div className="pt-3">
                  <b>TotalQuantity:</b>
                  <span>{itemQuantity}</span>
                </div>
                <div className="pt-3">
                  <b>TotalItemPrice:</b>
                  <span>{itemPrice}</span>
                </div>

                <div className="pt-3">
                  <b>TotalSalePrice:</b>
                  <span>-{itemSalePrice}</span>
                </div>
                <div className="pt-3">
                  <b>Total:</b>
                  <span>{itemPrice - itemSalePrice}</span>
                </div>
                <div className="pt-3">
                  <button className="button" onClick={handleCheckout}>Checkout</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CartItemPage;
