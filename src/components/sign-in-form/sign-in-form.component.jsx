import { useState } from "react";
import { SignInContainer, Title, ButtonContainer } from "./sign-in-form.styles";
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignInForm = () => {
  const defaultFormFields = {
    email: "",
    password: "",
  };
  const [formFields, SetFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    SetFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
      if (user.uid) {
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
          alert("email or password not valid");
          break;
        default:
          console.log(error);
      }
    }
  };

  const logGoogleUsers = async () => {
    await signInWithGooglePopup();
  };

  return (
    <SignInContainer>
      <Title>Already have an account?</Title>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="text"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="password"
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />
        <ButtonContainer>
          <Button button_type={BUTTON_TYPE_CLASSES.base} type="submit">
            Sign In
          </Button>
          <Button
            type="button"
            button_type={BUTTON_TYPE_CLASSES.google}
            onClick={logGoogleUsers}
          >
            Sign In with google
          </Button>
        </ButtonContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
