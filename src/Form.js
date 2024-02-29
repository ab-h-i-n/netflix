import { useState } from "react";

const useUserForm = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
    options: {
      data: {
        full_name: "",
      },
    },
  });

  const handleMailChange = (e) => {

    console.log(e.target.value);

    setForm({
      email: e.target.value,
      password: form.password,
      options: {
        data: {
          full_name: form.options.data.full_name,
        },
      },
    });
  };

  const handlePassChange = (e) => {

    console.log(e.target.value);

    setForm({
      email: form.email,
      password: e.target.value,
      options: {
        data: {
          full_name: form.options.data.full_name,
        },
      },
    });
  };

  const handleNameChange = (e) => {

    console.log(e.target.value);

    setForm({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: e.target.value,
        },
      },
    });
  };

  return {
    form,
    handleMailChange,
    handlePassChange,
    handleNameChange,
  };

};

export default useUserForm;
