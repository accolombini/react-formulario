import { Formik, useField } from 'formik';
import React from 'react';
import * as yup from 'yup';

// Estamos nesta aplicação trabalhando com um único componente 
// O componente Campo é uma boa prática que reduz o código e eleva a clareza evitando linhas repetidas
const Campo = ({ label, ...props }) => {
  const [field, meta] = useField(props);  // Este Hooks retorna o field e os meta atributos
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{label}</label>
      <input
        {...field}
        {...props}
        className={meta.error && meta.touched ? 'is-invalid' : ''}
      />
      {meta.error && meta.touched ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </div>
  );
};

const AdicionaCliente = () => {
  const esquema = yup.object({
    nome: yup
      .string()
      .required('O nome é obrigatório')
      .min(10, 'O nome deve ter no mínimo 10 caracteres')
      .max(30, 'O nome deve ter no máximo 30 caracteres'),
    email: yup
      .string()
      .required('O email é obrigatório')
      .email('O email é inválido'),
    nascimento: yup
      .date()
      .required('A data de nascimento é obrigatória')
      .max(new Date(), 'Você não pode ter nascido no futuro...'),
  });

  return (
    <>
      <h1>Cadastro de Clientes</h1>

      <Formik
        initialValues={{ nome: '', email: '', nascimento: '' }}
        validationSchema={esquema}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} noValidate>
            <Campo type="text" id="nome" name="nome" label="Nome" />
            <Campo type="email" id="email" name="email" label="Email" />
            <Campo
              type="date"
              id="nascimento"
              name="nascimento"
              label="Data de Nascimento"
            />
            <button type="submit">Adicionar</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AdicionaCliente;
