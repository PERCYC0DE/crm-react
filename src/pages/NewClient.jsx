import { useState } from "react";
import Form from "../components/FormRegister";

const NewClient = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1 className="font-black text-3xl text-colorSecondary uppercase font-openSans">
        Nuevo Cliente
      </h1>
      <p className="mt-3 italic font-openSans">
        Llena los siguientes campos para registrar un cliente
      </p>
      <Form loading={loading} />
    </>
  );
};

export default NewClient;
