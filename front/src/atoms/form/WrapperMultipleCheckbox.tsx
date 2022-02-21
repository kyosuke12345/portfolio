import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperText,
  FormLabel,
  FormControlLabelProps,
} from "@mui/material";
import { ReactElement, useCallback } from "react";
import { WrappedFieldProps } from "redux-form";
import { isString } from "utils/typeguard";

export type CheckBoxItem = {
  label: ReactElement;
  value: string;
};

export type WrapperMultipleCheckboxProps = CheckboxProps &
  Pick<
    FormControlProps,
    "fullWidth" | "disabled" | "className" | "classes" | "margin" | "required"
  > &
  Pick<FormControlLabelProps, "label"> &
  Pick<FormGroupProps, "row"> &
  WrappedFieldProps & {
    items: CheckBoxItem[];
  };

const WrapperMultipleCheckbox: React.VFC<WrapperMultipleCheckboxProps> = (
  props
) => {
  const {
    items,
    meta: { touched, error },
    input: { onChange, value, ...input },
    label,
    required,
    fullWidth,
    disabled,
    classes,
    className,
    margin,
    row,
    ...custom
  } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!Array.isArray(value)) {
        if (event.target.checked) {
          onChange([event.target.value]);
        } else {
          onChange([]);
        }
      } else {
        if (event.target.checked) {
          if (!value.includes(event.target.value)) {
            onChange(value.concat(event.target.value));
          }
        } else {
          onChange(value.filter((v) => v !== event.target.value));
        }
      }
    },
    [onChange, value]
  );

  return (
    <FormControl
      component="div"
      required={required}
      error={touched && isString(error)}
      className={className}
      fullWidth={fullWidth}
      classes={classes}
      disabled={disabled}
      margin={margin}
      onChange={handleChange}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row={row}>
        {items.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            control={
              <Checkbox
                checked={Array.isArray(value) && value.includes(item.value)}
                // onChange={handleChange}
                {...custom}
                // disabled={custom.disabled} // FormControl側でdisabledになるはず
                {...input}
                onBlur={undefined} // これいるかも
              />
            }
            label={item.label}
          />
        ))}
      </FormGroup>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

WrapperMultipleCheckbox.defaultProps = {
  row: true,
  fullWidth: true,
};

export default WrapperMultipleCheckbox;
