import "./checkout-item.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ checkoutItem }) => {
  const { name, imageUrl, price, quantity } = checkoutItem;
  const { addItemsToCart, removeItemsToCart, removeItem } =
    useContext(CartContext);

    const removeItemHandler = () => removeItem(checkoutItem);
    const addItemsToCartHandler = () => addItemsToCart(checkoutItem);
    const removeItemsToCartHandler = () => removeItemsToCart(checkoutItem);
    
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={removeItemsToCartHandler} className="arrow">
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div onClick={addItemsToCartHandler} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div onClick={removeItemHandler} className="remove-button">
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
