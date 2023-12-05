import { useState } from "react";

export default function useInput(inicialForm) {
  const [formState, setFormState] = useState(inicialForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const reset = () => {
    setFormState(inicialForm);
  };

  return { ...formState, formState, onInputChange, reset };
}
