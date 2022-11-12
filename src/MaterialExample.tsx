import { FormControl, Button, TextField } from "@mui/material";
import { useSimpleForm } from "./simple-form/hooks";

interface User {
  name: string;
  lastName: string;
}

export const MaterialExample = () => {
  const { isFormValid, formValues, ref, onChange, setField } =
    useSimpleForm<User>({
      defaultValues: {
        name: "Default Name",
        lastName: "Default Last Name",
      },
      schema: (z) => ({
        name: z.string().min(2).max(5),
        lastName: z.string().min(2).max(7),
      }),
    });

  const reset = () => {
    setField("name", "");
    setField("lastName", "");
  };

  return (
    <FormControl>
      <TextField name="name" ref={ref} inputRef={ref} onChange={onChange} />
      <TextField name="lastName" ref={ref} inputRef={ref} onChange={onChange} />
      <Button
        type="submit"
        disabled={!isFormValid}
        onClick={() => console.log(formValues)}
      >
        Submit
      </Button>
      <Button onClick={() => reset()}>Reset</Button>
    </FormControl>
  );
};
