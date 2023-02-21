import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Item } from "../parts/Item.element";
import { ShopCart } from "../parts/ShopCart.element";

export const ShopItems = () => {

    const [isShowCart, setIsChowCart] = useState(false);

    const showCart = () => {
        setIsChowCart(!isShowCart);
    };

    let items = [
        {
            id: 1,
            name: 'name 1',
            img: 'logo192.png',
            price: 20
        },
        {
            id: 2,
            name: 'name 2',
            img: 'logo192.png',
            price: 30
        },
        {
            id: 3,
            name: 'name 3',
            img: 'logo192.png',
            price: 25
        },
        {
            id: 4,
            name: 'name 4',
            img: 'logo192.png',
            price: 18
        },
        {
            id: 5,
            name: 'name 5',
            img: 'logo192.png',
            price: 20
        },
        {
            id: 6,
            name: 'name 6',
            img: 'logo192.png',
            price: 15
        }
    ]

    return (
        <div className="items">
            {
                items.map((e) => (
                    <Item
                        key={e.id}
                        info={e} />
                ))
            }
            {isShowCart &&
                <ShopCart />
            }
            <button
                className="shopCartButton"
                onClick={showCart}><FontAwesomeIcon icon={faCartShopping} /></button>
        </div>
    )
}