import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
} from "@mui/material";
import { WrappedFieldProps } from "redux-form";
import { isString } from "utils/typeguard";

export type WrapperCheckboxProps = CheckboxProps &
  Pick<
    FormControlProps,
    | "fullWidth"
    | "required"
    | "disabled"
    | "margin"
    | "size"
    | "variant"
    | "classes"
  > &
  Pick<FormControlLabelProps, "label"> &
  WrappedFieldProps;

const WrapperCheckbox: React.VFC<WrapperCheckboxProps> = (props) => {
  const {
    meta: { touched, error },
    input,
    label,
    required,
    fullWidth,
    margin,
    size,
    disabled,
    variant,
    classes,
    ...custom
  } = props;

  return (
    <FormControl
      component="div"
      required={required}
      error={touched && isString(error)}
      fullWidth={fullWidth}
      disabled={disabled}
      margin={margin}
      size={size}
      variant={variant}
      classes={classes}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={input.value ? true : false}
            {...input}
            {...custom}
          />
        }
        label={label}
      />
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

WrapperCheckbox.defaultProps = {
  fullWidth: true,
};

export default WrapperCheckbox;
