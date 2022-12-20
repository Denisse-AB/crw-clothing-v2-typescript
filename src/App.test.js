import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navigation from './routes/navigation/navigation';
import Home from './routes/home.tsx';
import SignInUp from './routes/sign-in-up/signInUp';
import CheckoutPage from './routes/checkout/checkout.component';

describe('<App />', () => {
  it('Renders the navigation bar', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </Provider>
    );
    const text = screen.getByText(/Sign In/i);
    expect(text).toBeInTheDocument();
  });

  it('Renders the Home page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const text = screen.getAllByText(/Shop Now/i);
    expect(text).toBeTruthy();
  });

  it('Renders the sign in and up page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignInUp />
        </BrowserRouter>
      </Provider>
    );
    const text = screen.getAllByText(/Sign Up/i);
    expect(text).toBeTruthy();
  });

  it('Renders the Checkout page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CheckoutPage />
        </BrowserRouter>
      </Provider>
    );
    const text = screen.getByText(/Product/i);
    expect(text).toBeInTheDocument();
  })
})
