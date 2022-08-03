import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const ViewClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClientById = async () => {
      try {
        const url = `${import.meta.VITE_API_URL}/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setClient(result);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setLoading(!loading);
      }, 1000);
    };
    getClientById();
  }, []);

  return loading ? (
    <Spinner />
  ) : Object.keys(client).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <div>
      <h1 className="font-blac text-4xl text-blue-900">Detalle del Cliente</h1>
      <p className="text-xl text-gray-700 mt-10">
        <span className="uppercase font-bold text-gray-800">Cliente:</span>{" "}
        {client.name}
      </p>
      <p className="text-xl text-gray-700 mt-3">
        <span className="uppercase font-bold text-gray-800">Email:</span>{" "}
        {client.email}
      </p>
      <p className="text-xl text-gray-700 mt-3">
        <span className="uppercase font-bold text-gray-800">Telefono:</span>{" "}
        {client.phone}
      </p>
      <p className="text-xl text-gray-700 mt-3">
        <span className="uppercase font-bold text-gray-800">Empresa:</span>{" "}
        {client.company}
      </p>
      {client.notes && (
        <p className="text-xl text-gray-700 mt-3">
          <span className="uppercase font-bold text-gray-800">Notas:</span>{" "}
          {client.notes}
        </p>
      )}
    </div>
  );
};

export default ViewClient;
