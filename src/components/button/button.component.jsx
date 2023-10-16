import './button.styles.scss'
const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
}
const Button = ({ children, button_type, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[button_type]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;