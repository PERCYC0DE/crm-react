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
        const url = `http://localhost:4000/clients/${id}`;
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
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
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
