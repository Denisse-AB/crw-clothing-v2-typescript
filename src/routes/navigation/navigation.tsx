import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// declaration for svs in custom.d.ts
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { selectCurrentUser } from "../../store/user/user-selector";
import { selectIsHidden } from "../../store/cart/cart-selector";
import { signOutStart } from "../../store/user/user-actions";

import CartIcon from "../../components/cart-icon/cart-icon";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown";

import './navigation.scss';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser)
  const isHidden = useSelector(selectIsHidden);

  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            Shop
          </Link>
          {
            currentUser
            ? <span className="nav-link" onClick={signOutUser}>Sign Out</span>
            : <Link className="nav-link" to='/sign-in'>Sign In</Link>
          }
          <CartIcon />
        </div>
        { isHidden && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;