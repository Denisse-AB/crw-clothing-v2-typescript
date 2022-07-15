import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import { selectCartItems, selectIsHidden } from '../../store/cart/cart-selector';
import { setIsHidden } from "../../store/cart/cart-actions";

import './cart-dropdown.scss'

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isHidden = useSelector(selectIsHidden);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
    dispatch(setIsHidden(!isHidden));
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <div className='empty'>Your cart is empty</div>
        )}
      </div>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;