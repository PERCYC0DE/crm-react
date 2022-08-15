import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../components/FormRegister";

const EditClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClientById = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setClient(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(!loading);
    };
    getClientById();
  }, []);

  return (
    <>
      <h1 className="font-black text-3xl text-colorSecondary uppercase font-openSans">
        Editar Cliente
      </h1>
      <p className="mt-3 italic font-openSans">
        Utiliza este formulario para editar los datos de un cliente
      </p>
      {client?.name ? (
        <Form client={client} loading={loading} />
      ) : (
        "ID de cliente no válido"
      )}
    </>
  );
};

export default EditClient;
