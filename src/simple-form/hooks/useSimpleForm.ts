import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { z, ZodRawShape } from "zod";
import { ObservedObject, useObserver } from "./useObserver";

interface UseFormArgs<T> {
  defaultValues: T;
  schema: (zod: typeof z) => ZodRawShape;
}

export const useForm = <T>({
  defaultValues,
  schema,
}: UseFormArgs<T>) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [formValues, setFormValues] = useState<T>(defaultValues);

  const formRef = useRef<T>(defaultValues);
  const formSchema = z.object(schema(z));

  useEffect(() => {
    const { success } = formSchema.safeParse(defaultValues);
    setIsFormValid(success);
  }, [])


  const formData = useObserver<T>(formRef.current as ObservedObject<T>, ({ target }) => {
      const { success } = formSchema.safeParse(target);
      console.log(success, target);
      setIsFormValid(success);

      return true;
  });

  const onChange = useCallback((e: ChangeEvent<any>) => {
    formData[e.target.name as keyof T] = e.target.value
  }, []);

  const ref = useCallback((element: any) => {
    if (element !== null) {
      element.value = formRef.current[element.name as keyof T] ?? ""
    }
  }, []);

  const register = (name: keyof T) => {
    return {
      onChange: (e: ChangeEvent<any>) => formData[name as keyof T] = e.target.value,
      ref: (element: any) => {
        if (element !== null) {
          element.value = formValues?.[name as keyof T] ?? ""
        }
      }
    };
  };


  const setValue = (name: keyof T, value: string) => {
    setFormValues((prevValues) => ({...prevValues, [name]: value}))
  }

  return {
    register,
    isFormValid,
    formData,
    onChange, 
    ref,
    setValue,
  };
};

