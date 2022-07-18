type Environment = {
  /** 起動モード */
  mode: "production" | "development";
};

declare const environment: Environment;

const _environment: Environment = {
  mode: environment.mode,
};

export { _environment as environment };
