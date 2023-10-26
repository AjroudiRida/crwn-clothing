import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import {ReactComponent as ShoppingCart} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'
const CartIcon = () => {
  const {isCartOpen, setIsCartOpen, quantity} = useContext(CartContext)
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen)
  }
  return (
    <div onClick={toggleIsCartOpen}  className="cart-icon-container">
      <ShoppingCart className="shopping-icon" />
      <div className="item-count">{quantity}</div>
    </div>
  );
};

export default CartIcon;
