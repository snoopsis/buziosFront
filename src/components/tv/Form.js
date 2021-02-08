import React, { useState } from "react";
import FormSignup from "./FormSignup";
import Agenda from "./Agenda";

const Form = props => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      {!isSubmitted ? (
        <FormSignup submitForm={submitForm} props={props} />
      ) : (
        <Agenda sucesso={{ sucesso: true }} />
      )}
    </>
  );
};

export default Form;
