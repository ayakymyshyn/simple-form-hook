import { useForm } from "./simple-form/hooks";

import "./App.css";

export function Form() {
  const { isFormValid, formData, register } = useForm({
    schema: (z) => ({
      name: z.string().min(2).max(5),
      lastName: z.string().min(2).max(7),
    }),
    defaultValues: {
      name: "John",
      lastName: "Doe",
    },
  });

  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(formData);
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
    </div>
  );
}

