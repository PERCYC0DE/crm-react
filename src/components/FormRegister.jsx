import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import MessageAlert from "./MessageAlert";
import Spinner from "./Spinner";

const FormRegister = ({ client, loading }) => {
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
      let response;
      if (client) {
        // Editar registro
        const url = `${import.meta.env.VITE_API_URL}/${client.id}`;
        response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      } else {
        // Nuevo registro
        const url = `${import.meta.env.VITE_API_URL}`;
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
      }
      await response.json();
      navigate("/clients");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="bg-white mt-10 px-5 py-10 rounded-md shadow-md
            md:w-3/4 mx-auto"
        >
          <h1 className="text-colorSecondary font-bold text-xl uppercase text-center">
            {client?.name ? "Editar cliente" : "Agregar cliente"}
          </h1>

          <Formik
            initialValues={{
              name: client?.name ?? "",
              company: client?.company ?? "",
              email: client?.email ?? "",
              phone: client?.phone ?? "",
              notes: client?.notes ?? "",
            }}
            enableReinitialize={true} // Vuelve a ejecutar el componente y tomara los valores del initialValues
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
                      placeholder="Nombre del cliente"
                      className="mt-2 block w-full p-3 bg-gray-200 outline-colorSecondary"
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
                      placeholder="Nombre de la empresa"
                      className="mt-2 block w-full p-3 bg-gray-200 outline-colorSecondary"
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
                      placeholder="ejemplo@correo.com"
                      className="mt-2 block w-full p-3 bg-gray-200 outline-colorSecondary"
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
                      placeholder="Ejemplo: 911 123 123"
                      className="mt-2 block w-full p-3 bg-gray-200 outline-colorSecondary"
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
                      placeholder="Notas sobre el cliente"
                      className="mt-2 block w-full p-3 bg-gray-200 h-40 outline-colorSecondary"
                      name="notes"
                    />
                  </div>
                  <input
                    type="submit"
                    // value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                    value={client?.name ? "Editar cliente" : "Agregar cliente"}
                    className="mt-5 w-full bg-colorAlternative p-3 text-white uppercase font-bold text-lg hover:cursor-pointer"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
};

// Utilizando los default Props para que los tome como valores iniciales al agregar nuevo cliente
// Form.defaultProps = {
//   client: {},
//   loading: false,
// };

export default FormRegister;
