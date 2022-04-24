import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkUserSession } from './store/user/user-actions';

import Home from './routes/home';
import Navigation from './routes/navigation/navigation';
import CheckoutPage from './routes/checkout/checkout';
import SignInUp from './routes/sign-in-up/signInUp';
import Shop from './routes/shop/shop';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='sign-in' element={<SignInUp />} />
        <Route path='checkout' element={<CheckoutPage />} />
      </Route>
    </Routes>
  )
};

export default App;
