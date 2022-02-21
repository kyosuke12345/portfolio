/** nullかundefinedかどうか */
export function isNullOrUndefined(object: unknown): object is null | undefined {
  return object === null || object === undefined;
}

/** nullかどうか */
export function isNull(object: unknown): object is null {
  return object === null;
}

/** undefinedかどうか */
export function isUndefined(object: unknown): object is undefined {
  return object === undefined;
}

/** numberかどうか */
export function isNumber(object: unknown): object is number {
  return typeof object === "number";
}
/** stringかどうか */
export function isString(object: unknown): object is string {
  return typeof object === "string";
}

/** booleanかどうか */
export function isBoolean(object: unknown): object is boolean {
  return typeof object === "boolean";
}

/** objectかどうか */
export function isObject(object: unknown): object is Record<string, unknown> {
  return object !== null && typeof object === "object";
}
/**
 * T型配列かどうか
 * @param object 対象オブジェクト
 * @param isFunc T型判定用関数
 * @param args isFuncの第2引数以降の引数
 * @typeParam T 配列の要素型
 * @typeParam P isFuncの第2引数以降の型
 */
export function isArray<T, P>(
  object: unknown,
  isFunc:
    | ((object: unknown, ...args: P[]) => object is T)
    | ((object: unknown, ...args: P[]) => boolean),
  ...args: P[]
): object is T[] {
  return (
    Array.isArray(object) && object.every((element) => isFunc(element, ...args))
  );
}

/** number[]かどうか */
export function isNumbers(object: unknown): object is number[] {
  return isArray(object, isNumber);
}

/** string[]かどうか */
export function isStrings(object: unknown): object is string[] {
  return isArray(object, isString);
}

/** boolean[]かどうか */
export function isBooleans(object: unknown): object is boolean[] {
  return isArray(object, isBoolean);
}

/**
 * オブジェクトが指定プロパティを持つかどうか
 * @param object 対象オブジェクト
 * @param names プロパティ名
 */
export function hasProperty<T extends string | number | symbol>(
  object: unknown,
  ...names: T[]
): object is Record<T, unknown> {
  return isObject(object) && names.every((name) => name in object);
}
