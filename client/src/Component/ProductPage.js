// ProductPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductHeader from "./Productitem/ProductHeader";
import ItemList from "./Productitem/ItemList";
import MainHeader from "./MainHeader";
import '../App.css';

const ProductPage = () => {
  const [datalist, setDataList] = useState([]);
  const [CartItemlist, setCartItemlist] = useState([]);
  const [filteredCartItems, setFilteredCartItems] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0); // Initialize count state
  const userId = localStorage.getItem("UserId");

  const getFetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/products");
     // console.log(response)

      if (response.status === 200) {
       // console.log(response.data)
        setDataList(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  useEffect(() => {
    getFetchData();
    FetchCartItemData();
  }, []);

  useEffect(() => {
    // Filter CartItemlist based on userId
    const filteredItems = CartItemlist.filter((item) => item.userId === parseInt(userId));
    setFilteredCartItems(filteredItems);
    setTotalItemCount(filteredItems.length); // Update count when filtered items change
  }, [userId, CartItemlist]);

  const handleItemAddedToCart = () => {
    // Use the functional form to ensure you are working with the latest state value
    setTotalItemCount((prevCount) => prevCount + 1);
  };
  

  return (
    <>
      <div className="container-fluid">
        <div className="row">
        <div className="col-md-12">
         
            <MainHeader count={totalItemCount} />
          </div>
          <div className="col-md-12 mt-md-5">
         
            <ProductHeader count={totalItemCount} />
          </div>
          <div className="col-md-12">
      
            <ItemList datalist={datalist} onItemAddedToCart={handleItemAddedToCart} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
