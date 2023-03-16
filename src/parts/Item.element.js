import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import defaultImg from "../images/t-shirt.png"

export const Item = (props) => {

    return (
        <div className="item">
            <img
                className="itemImage"
                src={defaultImg}
                alt={props.info.name} />
            <p className="itemName">{props.info.name}</p>
            <p className="itemPrice">price: {props.info.price.toFixed(2)}$</p>
            <span className="itemDescription">{props.info.description}</span>
            <button
                className="addToCart"
                onClick={() => props.onClick(props.info._id)}>
                <FontAwesomeIcon icon={faCartPlus} />
            </button>
        </div>
    )
};