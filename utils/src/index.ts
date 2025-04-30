export * from "./cn";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
