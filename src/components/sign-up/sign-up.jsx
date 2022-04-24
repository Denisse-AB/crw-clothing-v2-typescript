import { useState } from "react";
import { useDispatch } from "react-redux";

import { createUserAuthWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase";
import { signUpStart } from "../../store/user/user-actions";

import FormInput from "../form-inputs/form-input";
import Button from "../button/button";

import '../sign-up/sign-up.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  const dispatch = useDispatch();

  const resetFormFields = () => {
    return (
      setFormFields(defaultFormFields)
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match")
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      // const {user} = await createUserAuthWithEmailAndPassword(email, password)

      // const response = await createUserDocumentFromAuth(user, { displayName })

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('User Already Exists')
      }
      console.log("You have an error", error);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    // console.log(event.target) will pass the complete element
    setFormFields({...formFields, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="displayName"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />

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
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <FormInput
          laber="Confirm Password"
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUp;