import { useState } from "react";
const SignUpForm = () => {
  const [formFields, setFormFields] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = formFields;

  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  };
 console.log(formFields);
  return (
    <div>
      <h1>Sign up with email and password</h1>
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={onChangeHandle}
          name="displayName"
          value={displayName}
        />
        <label>Email</label>
        <input
          type="email"
          required
          onChange={onChangeHandle}
          name="email"
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          required
          onChange={onChangeHandle}
          name="password"
          value={password}
        />
        <label></label>
        <input
          type="password"
          required
          onChange={onChangeHandle}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
