import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FormData } from '../services/formData.service';

import defaultImg from "../images/t-shirt.png"
import { _orderGetById } from '../services/dataLoader.service';

export const SingleOrderShow = (props) => {

    const [error, setError] = useState(null);
    const [formValues, handleFormValueChange, setFormValues] = FormData({
        name: '',
        surname: '',
        phone: '',
        address: '',
        cart: []
    });

    let params = useParams();

    useEffect(() => {
        handleOrderGet();
    }, []);

    const handleOrderGet = async () => {
        let result = await _orderGetById(params.id);
        if (result.error) {
            console.log("--error:", result.error);
        } else {
            setFormValues({
                name: result.name,
                surname: result.surname,
                phone: result.phone,
                address: result.address,
                cart: result.cart
            });
        }
        setError(result.error);
    };

    return (
        <div className="content">
            <div>
                <div className="pageTitle">
                    <span>Order</span>
                <div className='backToShop'>
                    <Link to={'/office'}>Back to orders</Link>
                </div>
                </div>
                {error && <p className='errorMsg'>{error}</p>}
                <div className="pageContent">
                    <div className="mb-3">
                        <label
                            className='inputLabel'
                            htmlFor='name'>Name</label>
                        <p>{formValues.name}</p>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel'
                            htmlFor='name'>Surname</label>
                        <p>{formValues.surname}</p>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel'
                            htmlFor='name'>Phone</label>
                        <p>{formValues.phone}</p>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel'
                            htmlFor='name'>Address</label>
                        <p>{formValues.address}</p>
                    </div>
                    <div className="mb-3">
                        <label
                            className='inputLabel'
                            htmlFor='name'>Cart</label>
                        <div>
                            {
                                formValues.cart.map((e) => (
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
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};