import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { checkUserSession } from './store/user/user-actions';

import Spinner from "./components/spinner/spinner";
import { selectCurrentUser } from "./store/user/user-selector";

const Home = lazy(() => import('./routes/home'));
const Navigation = lazy(() => import('./routes/navigation/navigation'));
const CheckoutPage = lazy(() => import('./routes/checkout/checkout'));
const SignInUp = lazy(() => import('./routes/sign-in-up/signInUp'));
const Shop = lazy(() => import('./routes/shop/shop'));


const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='sign-in' element={user ? <Navigate to="/" /> : <SignInUp />} />
          <Route path='checkout' element={<CheckoutPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
};

export default App;
