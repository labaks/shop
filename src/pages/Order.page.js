import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { _makeOrder } from '../services/dataLoader.service';
import { FormData } from '../services/formData.service';

import defaultImg from "../images/t-shirt.png"

export const Order = (props) => {

    const [error, setError] = useState(null);
    const [shopCart, updateShopCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    //eslint-disable-next-line
    const [formValues, handleFormValueChange, setFormValues] = FormData({
        name: '',
        surname: '',
        phone: '',
        address: '',
        cart: []
    });

    useEffect(() => {
        if (localStorage.getItem('shopCart') !== undefined) {
            updateShopCart(JSON.parse(localStorage.getItem('shopCart')));
        }
    }, []);

    useEffect(() => {
        let total = 0;
        for (let item of shopCart) {
            total += item.price;
        }
        setTotalPrice(total);
        handleFormValueChange('cart', shopCart);
    }, [shopCart]);

    const handleOrder = async (event) => {
        event.preventDefault();
        let result = await _makeOrder(formValues);

        if (result.error) {
            setError(result.error);
        } else {
            props.navigate('/');
        }
    };

    return (
        <div className='content'>
            <div className='pageTitle'>
                <span>Make Order</span>
                <div className='backToShop'>
                    <Link to={'/'}>Back to shop</Link>
                </div>
            </div>
            {error && <p className='errorMsg'>{error}</p>}
            <div className="pageContent orderPage">
                <div className='orderForm'>
                    <div className="mb-3">
                        <label
                            className='inputLabel requiredInput'
                            htmlFor='name'>Your name</label>
                        <div className='inputWrapper'>
                            <input
                                id='name'
                                name='name'
                                type="text"
                                className={`formInput shortInput`}
                                placeholder="Your name"
                                value={formValues.name}
                                onChange={
                                    (event) => {
                                        handleFormValueChange(
                                            'name',
                                            event.target.value
                                        )
                                    }
                                } />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel requiredInput'
                            htmlFor='surname'>Your surname</label>
                        <div className='inputWrapper'>
                            <input
                                id='surname'
                                name='surname'
                                type="text"
                                className={`formInput shortInput`}
                                placeholder="Your surname"
                                value={formValues.surname}
                                onChange={
                                    (event) => {
                                        handleFormValueChange(
                                            'surname',
                                            event.target.value
                                        )
                                    }
                                } />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel requiredInput'
                            htmlFor='phone'>Phone number</label>
                        <div className='inputWrapper'>
                            <input
                                id='phone'
                                name='phone'
                                type="text"
                                className={`formInput shortInput`}
                                placeholder="Phone"
                                value={formValues.phone}
                                onChange={
                                    (event) => {
                                        handleFormValueChange(
                                            'phone',
                                            event.target.value
                                        )
                                    }
                                } />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel requiredInput'
                            htmlFor='address'>Address</label>
                        <div className='inputWrapper'>
                            <input
                                id='address'
                                name='address'
                                type="text"
                                className={`formInput shortInput`}
                                placeholder="Address"
                                value={formValues.address}
                                onChange={
                                    (event) => {
                                        handleFormValueChange(
                                            'address',
                                            event.target.value
                                        )
                                    }
                                } />
                        </div>
                    </div>
                </div>
                <div className='shopCartOrder'>
                    <div className="cartTitles">
                        <span>Item</span>
                        <span>Price</span>
                    </div>
                    {
                        shopCart.map((e) => (
                            <div
                                className="cartItem"
                                key={e._id}>
                                <div className="cartItemInfo">
                                    <img
                                        className="itemImage"
                                        src={defaultImg}
                                        alt={e.name} />
                                    <span>{e.name}</span>
                                </div>
                                <span className="cartItemPrice">{e.price.toFixed(2)}$</span>
                            </div>
                        ))
                    }
                    <button
                        className="buyButton"
                        disabled={shopCart.length === 0}
                        onClick={handleOrder}>Order for <b className="total">{totalPrice.toFixed(2)}$</b></button>
                </div>
            </div>
        </div>
    );
}