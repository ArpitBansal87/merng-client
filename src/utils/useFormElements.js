import { useState } from "react";

const useFormElements = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return { inputs, handleInputChange, handleSubmit };
};

export default useFormElements;
