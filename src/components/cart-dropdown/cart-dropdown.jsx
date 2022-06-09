import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectIsHidden, selectCartTotal, selectIsClientSecret } from "../../store/cart/cart-selector";
import { stripeSecretAction, setIsHidden } from "../../store/cart/cart-actions";
import { getData } from "../../utils/stripe/payment_intent";
import { useNavigate } from 'react-router-dom';

import Button from '../button/button';
import CartItem from '../cart-item/cart-item';

import './cart-dropdown.scss';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const isHidden = useSelector(selectIsHidden);
  const cartTotal = useSelector(selectCartTotal);
  const secret = useSelector(selectIsClientSecret)

  const checkoutHandler = async () => {
    try {
      // get stripe token
      const res = await getData('http://127.0.0.1:8000/secret', cartTotal, secret);
      dispatch(stripeSecretAction(res));

      navigate('/checkout');
      dispatch(setIsHidden(!isHidden));
    } catch (error) {
      alert(`${error} Stripe`);
    }
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        { cartItems.length ?
          (cartItems.map(item =>
            <CartItem key={item.id} cartItem={item} />))
          : (<span className='empty'>Your Cart Is Empty</span>)
        }
      </div>
      <Button buttonType='inverted' onClick={checkoutHandler}>Go to Checkout</Button>
    </div>
  );
}

export default CartDropdown;