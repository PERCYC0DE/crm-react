import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import MessageAlert from "./MessageAlert";

const FormRegister = () => {
  const navigate = useNavigate();

  // Schema of Data
  const newClientSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    company: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Formato de correo no válido")
      .required("El email es obligatorio"),
    phone: Yup.number()
      .integer("Formato de número no válido")
      .positive("Formato de número no válido")
      .typeError("Formato de número no válido"),
    notes: Yup.string().required(),
  });

  const handleSubmit = async (values) => {
    try {
      const url = "http://localhost:4000/clients";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      navigate("/clients");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="bg-white mt-10 px-5 py-10 rounded-md shadow-md
            md:w-3/4 mx-auto"
    >
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        Agregar Cliente
      </h1>

      <Formik
        initialValues={{
          name: "",
          company: "",
          email: "",
          phone: "",
          notes: "",
        }}
        validationSchema={newClientSchema}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Nombre:
                </label>
                <Field
                  id="name"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  name="name"
                />
                {errors.name && touched.name ? (
                  <MessageAlert>{errors.name}</MessageAlert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Empresa:
                </label>
                <Field
                  id="company"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  name="company"
                />
                {errors.company && touched.company ? (
                  <MessageAlert>{errors.company}</MessageAlert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Correo:
                </label>
                <Field
                  id="email"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  name="email"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Telefono:
                </label>
                <Field
                  id="phone"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  name="phone"
                />
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notes"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-200 h-40"
                  name="notes"
                />
              </div>
              <input
                type="submit"
                // value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                value={"Enviar"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default FormRegister;
