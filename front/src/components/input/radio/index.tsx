import {
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from "@mui/material";
import { ReactElement } from "react";
import { WrappedFieldProps } from "redux-form";
import { isString } from "utils/typeguard";

export type RadioItem = {
  label: ReactElement;
  value: string;
};

export type WrapperRadioProps = RadioProps &
  Pick<RadioGroupProps, "row"> &
  Pick<
    FormControlProps,
    "disabled" | "required" | "classes" | "className" | "fullWidth"
  > &
  WrappedFieldProps & {
    label: string | React.ReactNode;
    items: RadioItem[];
  };

const WrapperRadio: React.VFC<WrapperRadioProps> = (props) => {
  const {
    row,
    required,
    disabled,
    className,
    classes,
    fullWidth,
    meta: { touched, error },
    input,
    label,
    items,
    ...custom
  } = props;

  return (
    <FormControl
      component="fieldset"
      required={required}
      disabled={disabled}
      error={touched && isString(error)}
      className={className}
      classes={classes}
      fullWidth={fullWidth}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row={row} {...input}>
        {items.map((item, index) => (
          <FormControlLabel
            key={index}
            label={item.label}
            value={item.value}
            control={<Radio {...custom} />}
          />
        ))}
      </RadioGroup>

      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

WrapperRadio.defaultProps = {
  row: true,
  fullWidth: true,
};

export default WrapperRadio;
