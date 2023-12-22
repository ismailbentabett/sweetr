import { createSignal } from "solid-js";

type FormValues = {
  [key: string]: string;
};

type FormErrors = {
  [key: string]: string | null;
};

type FormState = {
  values: FormValues;
  errors: FormErrors;
  isValid: boolean;
};

const useForm = (initialValues: FormValues) => {
  const [values, setValues] = createSignal<FormValues>(initialValues);
  const [errors, setErrors] = createSignal<FormErrors>({});
  const [isValid, setIsValid] = createSignal<boolean>(true);

  const handleChange = (name: string, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const validationErrors: FormErrors = {};

    Object.keys(values()).forEach((key) => {
      const value = values()[key];

      if (key === "email") {
        if (!value || !value.includes("@")) {
          validationErrors[key] = "Invalid email address";
        } else {
          validationErrors[key] = null;
        }
      }
    });

    setErrors(validationErrors);

    setIsValid(
      Object.values(validationErrors).every((error) => error === null)
    );
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
