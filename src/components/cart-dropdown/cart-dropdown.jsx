import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectIsHidden } from "../../store/cart/cart-selector";
import { setIsHidden } from "../../store/cart/cart-actions";

import { useNavigate } from 'react-router-dom';

import Button from '../button/button';
import CartItem from '../cart-item/cart-item';

import './cart-dropdown.scss';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const isHidden = useSelector(selectIsHidden);


  const checkoutHandler = () => {
    navigate('/checkout'),
    dispatch(setIsHidden(!isHidden))
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        { cartItems.length ?
          (cartItems.map(item => <CartItem key={item.id} cartItem={item} />))
          : (<span className='empty'>Your Cart Is Empty</span>)
        }
      </div>
      <Button onClick={checkoutHandler}>Go to Checkout</Button>
    </div>
  );
}

export default CartDropdown;