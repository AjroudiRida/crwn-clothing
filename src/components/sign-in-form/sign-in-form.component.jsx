import { useState } from "react";
import "./sign-in-form.styles.scss";
import { signInUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
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
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" button_type="google" onClick={logGoogleUsers}>
            Sign In with google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
