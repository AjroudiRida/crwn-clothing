import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {ReactComponent as ShoppingCart} from '../../assets/shopping-bag.svg'
import {
  CartIconContainer,
  ShoppingIcon,
  ItemCount,
} from "./cart-icon.styles.jsx";
const CartIcon = () => {
  const {isCartOpen, setIsCartOpen, quantity} = useContext(CartContext)
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen)
  }
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <ItemCount>{quantity}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
