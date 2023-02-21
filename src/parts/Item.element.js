import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Item = (props) => {
    return (
        <div className="item">
            <img
                className="itemImage"
                src={props.info.img}
                alt={props.info.name} />
            <p className="itemName">{props.info.name}</p>
            <p className="itemPrice">price: {props.info.price}</p>
            <span className="itemDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum interdum iaculis. Aenean ultricies ante ut eleifend maximus.</span>
            <button
                className="addToCart">
                <FontAwesomeIcon icon={faCartPlus} />
            </button>
        </div>
    )
};