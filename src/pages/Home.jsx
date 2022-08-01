import React, { useEffect, useState } from "react";
import Client from "../components/Client";

const Home = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClientsAPI = async () => {
      try {
        const url = "http://localhost:4000/clients";
        const response = await fetch(url);
        const result = await response.json();
        setClients(result);
      } catch (error) {
        console.log(error);
      }
    };

    getClientsAPI();
  }, []);

  const handleDeleteClient = async (id) => {
    const confirmated = confirm("¿Deseas eliminar este cliente?");
    if (confirmated) {
      try {
        const url = `http://localhost:4000/clients/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        await response.json();

        // Los clientes estan en el state asi que tenemos que actualizarlo quitando el que hemos eliminado
        const arrayClients = clients.filter((client) => client.id !== id); // .filter no muta el array original
        setClients(arrayClients);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="font-blac text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <Client
              key={client.id}
              client={client}
              handleDeleteClient={handleDeleteClient}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
