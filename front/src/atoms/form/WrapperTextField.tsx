import { TextField, TextFieldProps } from "@mui/material";
import { WrappedFieldProps } from "redux-form";

export type WrapperTextFieldProps = TextFieldProps & WrappedFieldProps;

const WrapperTextField: React.VFC<WrapperTextFieldProps> = (props) => {
  const { meta, input, label, placeholder, helperText, ...custom } = props;

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      error={meta?.touched && meta?.invalid}
      helperText={
        meta?.touched && meta?.error
          ? meta.error
          : helperText
          ? helperText
          : " "
      }
      {...input}
      {...custom}
    />
  );
};

WrapperTextField.defaultProps = {
  fullWidth: true,
};

export default WrapperTextField;
