export type NullableFields<T> = { [K in keyof T]: T[K] | null };

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type Prettify<T> = {
  [P in keyof T]: T[P];
} & {};

export type AppLink = {
  icon: JSX.Element;
  title: string;
  pathname: string;
  hasChildren: boolean;
};

export type TableGroupData = {
  title: string | JSX.Element;
  heads?: { text: string; sortFn?: (a: string, b: string) => number }[];
  data: (string | JSX.Element)[][];
  tails?: String[];
};

export type TextWithFormatter = {
  text: string;
  formatter?: (value: any) => any;
};
