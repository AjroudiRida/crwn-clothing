import { FormInputLabel, Input, Group } from "./form-input.styles";
const FormInput = ({label, ...otherAttributes}) => {
return (
  <Group>
    <Input {...otherAttributes} />
    {label && (
      <FormInputLabel
        shrink={`${
          otherAttributes.value.length ? "shrink" : ""
        }`}
      >
        {label}
      </FormInputLabel>
    )}
  </Group>
);
}

export default FormInput