import { useMemo } from "react";

export type ObservableObject<T> = Record<keyof T, string>;
type Callback<T> = ({
  value,
  prop,
  target,
}: {
  value: string;
  prop: keyof T;
  target: ObservableObject<T>;
}) => boolean;

export const useObserver = <T>(
  object: ObservableObject<T>,
  callback: Callback<T>
) => {
  const handlers: ProxyHandler<ObservableObject<T>> = {
    set(target, prop, value) {
      target[prop as keyof T] = value;
      return callback({ value, prop: prop as keyof T, target });
    },
  };

  return useMemo(() => new Proxy(object, handlers), []);
};
