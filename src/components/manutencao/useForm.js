import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    primeiroNome: "",
    ultimoNome: "",
    local: "",
    problema: "",
    horario: ""
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
    axios({
      method: "post",
      url: "https://api.migueldias.net/buzios/novamanutencao",
      data: {
        nome: values.primeiroNome + " " + values.ultimoNome,
        local: values.local,
        problema: values.problema,
        horario: values.horario,
        data: moment().format("DD/MM") + " " + moment().format("HH:mm")
      }
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
