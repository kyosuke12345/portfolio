import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { WrappedFieldProps } from "redux-form";
import { isString } from "utils/typeguard";

export type RadioItem = {
  label: React.ReactElement;
  value: string;
};

export type WrapperSelectProps = SelectProps &
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
  WrappedFieldProps & {
    label?: React.ReactNode;
    items: RadioItem[];
    hasNoneItem?: boolean;
  };

const WrapperSelect: React.VFC<WrapperSelectProps> = (props) => {
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
    items,
    hasNoneItem,
    // ...custom
  } = props;

  return (
    <FormControl
      required={required}
      error={touched && isString(error)}
      fullWidth={fullWidth}
      disabled={disabled}
      margin={margin}
      size={size}
      variant={variant}
      classes={classes}
    >
      {label && <InputLabel>{label}</InputLabel>}
      <Select {...input}>
        {hasNoneItem && <MenuItem value={""}>{"\u00A0"}</MenuItem>}
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

WrapperSelect.defaultProps = {
  fullWidth: true,
  hasNoneItem: false,
};

export default WrapperSelect;
