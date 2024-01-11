import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/ItemList.css';
import axios from 'axios';

const ItemList = (props) => {
    const { datalist, onItemAddedToCart } = props;
    const [quantities, setQuantities] = useState({});

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
        const item = datalist.find((item) => item.id === itemId);
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
                onItemAddedToCart();
                alert("data inserted");
            }
        } else {
            alert("Please enter a quantity greater than 0.");
        }
    };

    return (
        <>
            <div className='mt-1 bg-white'>
                <h1>Available Items</h1>
                <div className='container '>
                    <div className='row d-flex '>
                        {datalist?.map((item) => (
                            <div key={item.id} className='col-md-3 maincontainer'>
                                <div className='item-container'>
                                    <div className='img-div'>
                                    <Link to={`/singleproduct/${item.id}`}>
                                        <img
                                            src={item.imageURL}
                                            alt={item.name}
                                            className='item-image'
                                        />
                                       
                                    </Link>
                                    </div>

                                   
                                   <div>
                                    <div>
                                    <p><b>Name:</b> {item.name}</p>

                                    </div>
                                   <div>
                                        <p style={{ textDecoration: item.IsSale ? 'line-through' : 'none' }}>
                                            {item.IsSale ? (
                                               <span style={{ color: 'red', fontWeight: '600' }}>Original Price: {item.Price}</span>

                                            ) : (
                                                `Price: ${item.Price}`
                                            )}
                                        </p>
                                        {item.IsSale ? (
                                            <p style={{ color: 'green' , fontWeight: '600'}}>Sale Price: {item.Price / 2}</p>
                                        ):""}
                                    </div>
                                    <div className="button-container">
                                        {quantities[item.id] >= 0 ? (
                                            <>
                                                <button className='Quantitybutton' onClick={() => handleQuantityDecrement(item.id)}>-</button>
                                                <span className='QuantityInput'>
                                                    <input
                                                        type="Number"
                                                        value={quantities[item.id] || 0}
                                                        onChange={(e) => handleQuantityChange(item.id, e)}
                                                        name="Quantity"
                                                    />
                                                </span>
                                                <button className='Quantitybutton' onClick={() => handleQuantityIncrement(item.id)}>+</button>
                                            </>
                                        ) : (
                                            <span>
                                                <input className='QuantityInput'
                                                    type="number"
                                                    value={quantities[item.id] || 0}
                                                    onChange={(e) => handleQuantityChange(item.id, e)}
                                                    name="Quantity"
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemList;
