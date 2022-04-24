import { useState } from "react";
import { useDispatch } from "react-redux";

import { googleSignInStart, emailSignInStart } from "../../store/user/user-actions";

import {
  signInWithGooglePopup,
  signInUserAuthWithEmailAndPassword
} from "../../utils/firebase/firebase";

import FormInput from "../form-inputs/form-input";
import Button from "../button/button";

import '../sign-up/sign-up.scss';

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

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      dispatch(emailSignInStart(email, password)); // using redux-saga
      // const { user } = await signInUserAuthWithEmailAndPassword(
      //   email,
      //   password
      // )

      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect Password')
          break;
        case 'auth/user-not-found':
          alert('User not Found')
          break;
        default:
          console.log(error);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    // console.log(event.target) will pass the complete element
    setFormFields({...formFields, [name]: value })
  }

  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
  }

  return (
    <div className="sign-up-container">
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={logGoogleUser} buttonType="google">Sign In With Google</Button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;