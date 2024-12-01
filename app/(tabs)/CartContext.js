import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = (newItem) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === newItem.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...newItem, quantity: 1 }];
            }
        });
    };

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    const updateCartItem = (itemId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                addToCart,
                updateCartItem,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
