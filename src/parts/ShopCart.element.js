import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const ShopCart = (props) => {
    return (
        <div className="shopCart">
            <p>Cart <FontAwesomeIcon icon={faCartShopping} /></p>
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
                                src={e.img}
                                alt={e.name} />
                            {e.name}
                        </div>
                        <span>{e.price.toFixed(2)}$</span>
                        <button
                            className="removeCartItem"
                            onClick={() => props.removeCartItem(e._id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                ))
            }
            <button className="buyButton">Order for <b className="total">{props.totalPrice.toFixed(2)}$</b></button>
        </div>
    )
};