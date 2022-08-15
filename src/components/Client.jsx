import React from "react";
import { useNavigate } from "react-router-dom";

const Client = ({ client, handleDeleteClient }) => {
  const navigate = useNavigate();

  const { name, company, email, phone, notes, id } = client;
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2">{name}</td>
      <td className="p-2">
        <div className="flex">
          <p className="text-gray-800 font-bold w-3/12">Email:</p>
          <p>{email}</p>
        </div>
        <div className="flex">
          <p className="text-gray-800 font-bold w-3/12">Telefono:</p>
          <p>{phone}</p>
        </div>
      </td>
      <td className="p-2">{company}</td>
      <td className="p-2">
        <button
          type="button"
          className="bg-yellow-600 hover:bg-yellow-700 block w-full text-white p-2 uppercase font-bold text-xs"
          onClick={() => navigate(`/clients/${id}`)}
        >
          Ver
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
          onClick={() => navigate(`/clients/edit/${id}`)}
        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3"
          onClick={() => handleDeleteClient(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Client;
