import { useSimpleForm } from "./simple-form/hooks";

export function Form() {
  const { isFormValid, formValues, register, setField } = useSimpleForm({
    schema: (z) => ({
      name: z.string().min(2).max(5),
      lastName: z.string().min(2).max(7),
    }),
    defaultValues: {
      name: "John",
      lastName: "Doe",
    },
  });

  const reset = () => {
    setField('name', '');
    setField('lastName', '');
  }

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formValues);
        }}
      >
        <div>
          <input type="text" {...register("name")} />
        </div>
        <div>
          <input type="text" {...register("lastName")} />
        </div>
        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
}
