import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Item } from "../parts/Item.element";
import { ShopCart } from "../parts/ShopCart.element";

export const ShopItems = () => {

    const [isShowCart, setIsChowCart] = useState(false);
    const [shopCart, updateShopCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [items, setItems] = useState([]);

    const [itemName, setItemName] = useState('');
    const [itemImg, setItemImg] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemDescription, setItemDescription] = useState('');

    useEffect(() => {
        if (localStorage.getItem('shopCart') !== undefined) {
            updateShopCart(JSON.parse(localStorage.getItem('shopCart')));
        }
        async function getRecords() {
            const response = await fetch(`http://localhost:5000/shop-items/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setItems(records);
        }

        getRecords();
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

    // let items = [
    //     {
    //         id: 1,
    //         name: 'name 1',
    //         img: 'logo192.png',
    //         price: 20.5,
    //         description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum interdum iaculis. Aenean ultricies ante ut eleifend maximus.'
    //     }
    // ]

    const addItem = async () => {

        const data = {
            name: itemName,
            img: itemImg,
            price: itemPrice,
            description: itemDescription
        }
        console.log(data);

        await fetch("http://localhost:5000/shop-items/add-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
    };

    return (
        <div className="items">
            <div>
                <input value={itemName} placeholder="Item Name" onChange={(event) => setItemName(event.target.value)}></input>
                <input value={itemImg} placeholder="Item Img" onChange={(event) => setItemImg(event.target.value)}></input>
                <input value={itemPrice} placeholder="Item Price" onChange={(event) => setItemPrice(event.target.value)}></input>
                <input value={itemDescription} placeholder="Item Description" onChange={(event) => setItemDescription(event.target.value)}></input>
                <button onClick={addItem}>Add</button>
            </div>
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