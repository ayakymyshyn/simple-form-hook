import { FormControl, Input, Button, TextField } from "@mui/material";
import { useForm } from "./simple-form/hooks";

interface User {
  name: string;
  lastName: string;
}

export const MaterialExample = () => {
  const { isFormValid, formData, ref, onChange } = useForm<User>({
    defaultValues: {
      name: "John",
      lastName: "Doe",
    },
    schema: (z) => ({
      name: z.string().min(2).max(5),
      lastName: z.string().min(2).max(7),
    }),
  });
  return (
    <FormControl
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formData);
      }}
    >
      <TextField name="name" inputRef={ref} onChange={onChange} />
      <TextField name="lastName" inputRef={ref} onChange={onChange} />
      <Button type="submit" disabled={!isFormValid} onClick={() => console.log(formData)}>Submit</Button>
    </FormControl>
  );
};
