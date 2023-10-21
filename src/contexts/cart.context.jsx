import { createContext, useState, useEffect } from "react";
const addCartItem = (cartItems, item) => {
  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
  if (cartItem) {
    return cartItems.map((item) =>
      cartItem.id === item.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...cartItems, { ...item, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  quantity: 0,
});
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
     const sum = cartItems.reduce((accumulator, cartItem) => {
       return accumulator + cartItem.quantity;
     }, 0);
     setQuantity(sum)
  }, [cartItems])
  const addItemsToCart = (item) => {
    const items = addCartItem(cartItems, item);
    setCartItems(items);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemsToCart,
    quantity,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
