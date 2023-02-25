import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

import { Item } from "../parts/Item.element";
import { ShopCart } from "../parts/ShopCart.element";

import { _shopItemGet } from "../services/dataLodaer.service";

export const ShopItems = () => {

    const [isShowCart, setIsChowCart] = useState(false);
    const [shopCart, updateShopCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('shopCart') !== undefined) {
            updateShopCart(JSON.parse(localStorage.getItem('shopCart')));
        }
        getItems();
    }, []);

    const getItems = async () => {
        let result = await _shopItemGet();
        if (result.error) {
            console.log("---error:", result.error);
        } else {
            setItems(result);
        }
    };

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
            total += Number(item.price);
        }
        setTotalPrice(total);
        localStorage.setItem("shopCart", JSON.stringify(shopCart));
    }, [shopCart]);

    return (
        <div className="items">
            {
                items.map((e) => (
                    <Item
                        key={e._id}
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