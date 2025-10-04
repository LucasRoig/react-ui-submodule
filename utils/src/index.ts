export * from "./cn";
export * from "./use-mobile";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
