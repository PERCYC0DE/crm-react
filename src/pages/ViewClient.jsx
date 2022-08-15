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
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
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
      <h1 className="font-blac text-3xl text-colorSecondary uppercase">
        Detalle del Cliente
      </h1>
      <div className="flex items-start mt-10 border-b-2">
        <p className="uppercase font-bold text-gray-800 w-2/12">Cliente:</p>
        <p className="text-gray-700"> {client.name}</p>
      </div>
      <div className="flex items-start mt-2 border-b-2">
        <p className="uppercase font-bold text-gray-800 w-2/12">Email:</p>
        <p className="text-gray-700">{client.email}</p>
      </div>
      <div className="flex items-start mt-2 border-b-2">
        <p className="uppercase font-bold text-gray-800 w-2/12">Telefono:</p>
        <p className="text-gray-700">{client.phone}</p>
      </div>
      <div className="flex items-start mt-2 border-b-2">
        <p className="uppercase font-bold text-gray-800 w-2/12">Empresa:</p>
        <p className="text-gray-700">{client.company}</p>
      </div>
      {client.notes && (
        <div className="flex items-start mt-2 border-b-2">
          <p className="uppercase font-bold text-gray-800 w-2/12">Notas:</p>
          <p className=" text-gray-700">{client.notes}</p>
        </div>
      )}
    </div>
  );
};

export default ViewClient;
