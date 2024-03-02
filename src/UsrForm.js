import { useState } from "react";

const useUserForm = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: ""
  });

  const handleMailChange = (e) => {

    setForm({
      email: e.target.value,
      password: form.password,
      full_name : form.full_name,
    });
  };

  const handlePassChange = (e) => {

    setForm({
      email: form.email,
      password: e.target.value,
      full_name:form.full_name,
    });
  };

  const handleNameChange = (e) => {

    setForm({
      email: form.email,
      password: form.password,
      full_name:e.target.value,
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
