import { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkUserSession } from './store/user/user-actions';

import Spinner from "./components/spinner/spinner";

const Home = lazy(() => import('./routes/home'));
const Navigation = lazy(() => import('./routes/navigation/navigation'));
const CheckoutPage = lazy(() => import('./routes/checkout/checkout'));
const SignInUp = lazy(() => import('./routes/sign-in-up/signInUp'));
const Shop = lazy(() => import('./routes/shop/shop'));


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);
  // TODO: auth guard stopping sign in and up
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='shop/*' element={<Shop />} />
          <Route path='sign-in' element={<SignInUp />} />
          <Route path='checkout' element={<CheckoutPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
};

export default App;
