import React, { useEffect, useState } from "react";
import Client from "../components/Client";

const Home = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClientsAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
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
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
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
      <h1 className="font-black text-3xl text-colorSecondary uppercase font-openSans">
        Clientes
      </h1>
      <p className="mt-3 italic font-openSans">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-colorSecondary text-white">
          <tr>
            <th className="py-1 border">Nombre</th>
            <th className="py-1 border">Contacto</th>
            <th className="py-1 border">Empresa</th>
            <th className="py-1 border">Acciones</th>
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
