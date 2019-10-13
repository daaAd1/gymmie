import { useState } from "react";

export const useSubmitForm = callback => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);

  const resetInputs = () => {
    Object.keys(inputs).forEach(key => {
      setInputs(inputs => ({
        ...inputs,
        [key]: ""
      }));
    });
  };

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }

    callback();
  };

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  return {
    resetInputs,
    handleSubmit,
    handleInputChange,
    inputs,
    error,
    setError
  };
};
