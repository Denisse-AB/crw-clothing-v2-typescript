import { useSelector, useDispatch } from "react-redux";
import { selectIsHidden, selectCartCount } from "../../store/cart/cart-selector";
import { setIsHidden } from "../../store/cart/cart-actions";
// declaration for importing svg in custom.d.ts
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.scss';

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isHidden = useSelector(selectIsHidden);

  const toggleHidden = () => dispatch(setIsHidden(!isHidden))

  return (
    <div className='cart-icon-container' onClick={toggleHidden}>
      <ShoppingIcon className='shopping-icon'/>
      <span className='item-count'>{cartCount}</span>
    </div>
  );
}

export default CartIcon;