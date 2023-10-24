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

const removeCartItem = (cartItems, cartItemToRemove) => {
  const { id, quantity } = cartItemToRemove;
  if (quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemsToCart: () => {},
  quantity: 0,
  removeItemsToCart: () => {},
  total: 0,
  removeItem: () => {},
});
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const sum = cartItems.reduce((accumulator, cartItem) => {
      return accumulator + cartItem.quantity;
    }, 0);
    setQuantity(sum);
  }, [cartItems]);

  useEffect(() => {
    const totalCheckout = cartItems.reduce((accumulator, cartItem) => {
      return accumulator + cartItem.price * cartItem.quantity;
    }, 0);
    setTotal(totalCheckout);
  }, [cartItems]);

  const addItemsToCart = (item) => {
    setCartItems(addCartItem(cartItems, item));
  };

  const removeItemsToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const removeItem = (checkoutItemToRemove) => {
    const newCheckoutItems = cartItems.filter(
      (cartItem) => cartItem.id !== checkoutItemToRemove.id
    );
    setCartItems(newCheckoutItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemsToCart,
    quantity,
    removeItemsToCart,
    removeItem,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
