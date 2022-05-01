import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button';
import { googleSignInStart, emailSignInStart } from "../../store/user/user-actions";

import FormInput from "../form-inputs/form-input";

import { SignInContainer, ButtonsContainer } from './sign-in-styles';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignIn = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields


  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      dispatch(emailSignInStart(email, password));

      resetFormFields()
    } catch (error) {
      console.log('User Sign In Failed', error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormFields({...formFields, [name]: value })
  }

  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
  }

  return (
    <SignInContainer>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type='password'
          required
          name='password'
          value={password}
          onChange={handleChange}
        />
         <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={logGoogleUser}
          >
            Google Sign In
          </Button>
         </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignIn;