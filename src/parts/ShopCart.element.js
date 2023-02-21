import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const ShopCart = () => {
    return (
        <div className="shopCart">
            <p>Cart <FontAwesomeIcon icon={faCartShopping} /></p>
            <div className="cartTitles">
                <span>Item</span>
                <span>Price</span>
            </div>
            <button className="buyButton">By for <b className="total">0.00$</b></button>
        </div>
    )
};