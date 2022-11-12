import { ChangeEvent, useEffect, useRef, useState } from "react";
import { z, ZodRawShape, ZodSchema } from "zod";
import { ObservableObject, useObserver } from "./useObserver";

interface UseFormArgs<T> {
  defaultValues: T;
  schema: (zod: typeof z) => ZodRawShape;
}

const validateForm = <T, >(schema: ZodSchema, object: T) => {
  const { success } = schema.safeParse(object);

  return success;
};

export const useSimpleForm = <T>({ defaultValues, schema }: UseFormArgs<T>) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [, forceRerender] = useState(Date.now());

  const formSchema = z.object(schema(z));

  useEffect(() => {
    const isValid = validateForm(formSchema, defaultValues);
    setIsFormValid(isValid);
  }, []);

  const formValues = useObserver<T>(
    defaultValues as ObservableObject<T>,
    ({ target }) => {
      const isValid = validateForm(formSchema, target);
      setIsFormValid(isValid);

      return true;
    }
  );

  const onChange = (e: ChangeEvent<any>) => {
    formValues[e.target.name as keyof T] = e.target.value;
  };

  const ref = (element: any) => {
    if (element !== null) {
      element.value = formValues[element.name as keyof T] ?? "";
    }
  };

  const register = (name: keyof T) => {
    return {
      onChange: (e: ChangeEvent<any>) =>
        (formValues[name as keyof T] = e.target.value),
      ref: (element: any) => {
        if (element !== null) {
          element.value = formValues[name as keyof T] ?? "";
        }
      },
    };
  };

  const setField = (name: keyof T, value: string) => {
    formValues[name] = value;
    forceRerender(Date.now());
  };

  return {
    register,
    isFormValid,
    formValues,
    onChange,
    ref,
    setField,
  };
};
