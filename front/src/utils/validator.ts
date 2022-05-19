import { Validator } from "redux-form";
import validator from "validator";
import { isBoolean, isNumber, isString, isUndefined } from "./typeguard";

const errorMessages = {
  required: "入力してください",
  numeric: "半角数字のみ",
  email: "正しいメールアドレスを入力してください。",
  maxLength: (maxLength: number): string =>
    `${maxLength}文字以内で入力してください`,
  minLength: (minLength: number): string =>
    `${minLength}文字以上で入力してください`,
  minValue: (value: number) => `${value}以上を入力してください。`,
  maxValue: (value: number) => `${value}以下を入力してください。`,
  lt: (otherFiledLabel: string) => `${otherFiledLabel}以下を入力してください。`,
  mt: (otherFiledLabel: string) => `${otherFiledLabel}以上を入力してください。`,
};

export const required: Validator = (value) => {
  if (isNumber(value)) {
    return undefined;
  } else if (isString(value)) {
    return value.length > 0 ? undefined : errorMessages.required;
  } else if (isBoolean(value)) {
    return value ? undefined : errorMessages.required;
  } else if (isUndefined(value)) {
    return errorMessages.required;
  } else {
    console.warn("value is invalid");
    return errorMessages.required;
  }
};

export const isNumeric: Validator = (value) => {
  if (!isNaN(Number(value))) {
    return undefined;
  } else {
    return errorMessages.numeric;
  }
};

/** 文字数最大長バリデート */
export const maxLength: (maxLength: number) => Validator =
  (maxLength) => (value) => {
    if (isUndefined(value)) {
      return undefined;
    } else if (isNumber(value)) {
      return `${value}`.length <= maxLength
        ? undefined
        : errorMessages.maxLength(maxLength);
    } else if (isString(value)) {
      return value.length <= maxLength
        ? undefined
        : errorMessages.maxLength(maxLength);
    } else {
      console.warn("value can't get length");
      return errorMessages.maxLength(maxLength);
    }
  };

/** 文字数最小長バリデート */
export const minLength: (minLength: number) => Validator =
  (minLength) => (value) => {
    if (isUndefined(value)) {
      return errorMessages.minLength(minLength);
    } else if (isNumber(value)) {
      return minLength <= `${value}`.length
        ? undefined
        : errorMessages.minLength(minLength);
    } else if (isString(value)) {
      return minLength <= value.length
        ? undefined
        : errorMessages.minLength(minLength);
    } else {
      console.warn("value can't get length");
      return errorMessages.minLength(minLength);
    }
  };

export const email: Validator = (value) => {
  if (isUndefined(value)) {
    return undefined;
  } else if (isString(value)) {
    return validator.isEmail(value) ? undefined : errorMessages.email;
  } else {
    return errorMessages.email;
  }
};

export const minValue: (minValue: number) => Validator =
  (minValue) => (value) => {
    if (isNumber(value) && value < minValue) {
      return errorMessages.minValue(minValue);
    }
    return undefined;
  };

export const maxValue: (maxValue: number) => Validator =
  (maxValue) => (value) => {
    if (isNumber(value) && value > maxValue) {
      return errorMessages.maxValue(maxValue);
    }
    return undefined;
  };

export const lt: (otherFiledName: string, label: string) => Validator =
  (otherField, label) => (value, allValues) => {
    const otherValue = allValues[otherField];
    if (isNumber(otherValue) && isNumber(value)) {
      if (otherValue > value) {
        return errorMessages.lt(label);
      }
    }
    return undefined;
  };

export const mt: (otherFiledName: string, label: string) => Validator =
  (otherField, label) => (value, allValues) => {
    const otherValue = allValues[otherField];
    if (isNumber(otherValue) && isNumber(value)) {
      if (otherValue < value) {
        return errorMessages.mt(label);
      }
    }
    return undefined;
  };
