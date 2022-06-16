import { useSelector, useDispatch } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart-selector';
import { removeItemFromCart, clearItemFromCart, addItemToCart } from '../../store/cart/cart-actions';
import './checkout-item.scss';

type CartItem = {
  cartItem: {
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    quantity: number
  }
}

const CheckoutItem = ({cartItem}: CartItem) => {
  const { name, price, imageUrl, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
  const decreaseQtyHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
  const addItemToCartHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={decreaseQtyHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div onClick={clearItemHandler} className='remove-button'>&#10005;</div>
    </div>
  );
}
export default CheckoutItem;