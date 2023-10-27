import { useState } from "react";
import {SignUpContainer, Title} from "./sign-up-form.styles.jsx";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
const SignUpForm = () => {
  const defaultFormField = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formFields, setFormFields] = useState(defaultFormField);

  const { displayName, email, password, confirmPassword } = formFields;

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password and confirmation password doesn't match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      setFormFields(defaultFormField);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      }
    }
  };

  return (
    <SignUpContainer>
      <Title>Don't have an account?</Title>
      <span>Sign up with email and password</span>
      <form onSubmit={onSubmitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={onChangeHandle}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={onChangeHandle}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={onChangeHandle}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm password"
          type="password"
          required
          onChange={onChangeHandle}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
