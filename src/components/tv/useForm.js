import { useState, useEffect } from "react";
import axios from "axios";

const useForm = (callback, validate, escolha) => {
  const [values, setValues] = useState({
    nome: "",
    horario: "",
    programa: "",
    data: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);

    axios
      .post("https://api.migueldias.net/buzios/novoCanal", {
        canal: escolha.canal,
        numero: escolha.numero,
        nome: values.nome,
        horario: values.horario,
        programa: values.programa,
        data: values.data
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
    // eslint-disable-next-line
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
