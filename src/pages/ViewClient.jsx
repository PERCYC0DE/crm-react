import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState([]);

  useEffect(() => {
    const getClientById = async () => {
      try {
        const url = `http://localhost:4000/clients/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
        setClient(result);
      } catch (error) {
        console.log(error);
      }
    };
    getClientById();
  }, []);

  return (
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
