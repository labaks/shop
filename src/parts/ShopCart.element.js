import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import defaultImg from "../images/t-shirt.png"

export const ShopCart = (props) => {

    const makeOrder = () => {
        props.navigate('order');
    };

    return (
        <div className="shopCart">
            <p>Cart <FontAwesomeIcon icon={faCartShopping} /></p>
            {props.cart.length > 0 &&
                <div>
                    <div className="cartTitles">
                        <span>Item</span>
                        <span>Price</span>
                        <span></span>
                    </div>
                    {
                        props.cart.map((e) => (
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
                                <button
                                    className="removeCartItem"
                                    onClick={() => props.removeCartItem(e._id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                        ))
                    }
                    <button
                        className="buyButton"
                        disabled={props.cart.length === 0}
                        onClick={makeOrder}>Order for <b className="total">{props.totalPrice.toFixed(2)}$</b></button>
                </div>
            }
            {props.cart.length === 0 &&
                <span>Your cart is empty :( Add something!</span>
            }
        </div>
    )
};