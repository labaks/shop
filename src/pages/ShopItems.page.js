import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Item } from "../parts/Item.element";
import { ShopCart } from "../parts/ShopCart.element";

export const ShopItems = () => {

    const [isShowCart, setIsChowCart] = useState(false);
    const [shopCart, updateShopCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('shopCart') !== undefined) {
            updateShopCart(JSON.parse(localStorage.getItem('shopCart')));
        }
    }, []);

    const showCart = () => {
        setIsChowCart(!isShowCart);
    };

    const addToCart = (id) => {
        if (shopCart.find((item) => item.id === id)) {
            console.log("already exist");
            return;
        }
        let item = items.find((item) => item.id === id);
        updateShopCart(shopCart => [...shopCart, item]);
    };

    const removeCartItem = (id) => {
        updateShopCart(shopCart.filter(item => item.id !== id));
    };

    useEffect(() => {
        let total = 0;
        for (let item of shopCart) {
            total += item.price;
        }
        setTotalPrice(total);
        localStorage.setItem("shopCart", JSON.stringify(shopCart));
    }, [shopCart]);

    let items = [
        {
            id: 1,
            name: 'name 1',
            img: 'logo192.png',
            price: 20.5,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum interdum iaculis. Aenean ultricies ante ut eleifend maximus.'
        },
        {
            id: 2,
            name: 'name 2',
            img: 'logo192.png',
            price: 30,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum interdum iaculis. Aenean ultricies ante ut eleifend maximus.'
        },
        {
            id: 3,
            name: 'name 3',
            img: 'logo192.png',
            price: 25,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum interdum iaculis. Aenean ultricies ante ut eleifend maximus.'
        },
        {
            id: 4,
            name: 'name 4',
            img: 'logo192.png',
            price: 18,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum interdum iaculis. Aenean ultricies ante ut eleifend maximus.'
        },
        {
            id: 5,
            name: 'name 5',
            img: 'logo192.png',
            price: 20,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum interdum iaculis. Aenean ultricies ante ut eleifend maximus.'
        },
        {
            id: 6,
            name: 'name 6',
            img: 'logo192.png',
            price: 15,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum interdum iaculis. Aenean ultricies ante ut eleifend maximus.'
        }
    ]

    return (
        <div className="items">
            {
                items.map((e) => (
                    <Item
                        key={e.id}
                        info={e}
                        onClick={addToCart} />
                ))
            }
            {isShowCart &&
                <ShopCart
                    cart={shopCart}
                    removeCartItem={removeCartItem}
                    totalPrice={totalPrice} />
            }
            <button
                className="shopCartButton"
                onClick={showCart}><FontAwesomeIcon icon={faCartShopping} /></button>
        </div>
    )
}