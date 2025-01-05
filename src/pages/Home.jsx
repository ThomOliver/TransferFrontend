import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-backgroundPrimary text-white p-4">
      <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-6 text-buttonColor text-center">
        Bem-vindo
      </h1>
      <p className="text-lg md:text-xl text-center max-w-md mb-10 text-textColor">
        Sistema de Transferências
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/transfers"
          className="bg-backgroundPrimary border-2 border-teal-300 px-6 py-2 text-lg font-medium rounded-full shadow hover:bg-hoverButtonColor hover:text-backgroundPrimary transition-all duration-200 text-center"
        >
          Criar Transferência
        </Link>
        <Link
          to="/listTransfers"
          className="bg-backgroundPrimary border-2 border-teal-300 px-6 py-2 text-lg font-medium rounded-full shadow hover:bg-hoverButtonColor hover:text-backgroundPrimary transition-all duration-200 text-center"
        >
          Ir para Lista de Transferências
        </Link>
      </div>
    </div>
  );
}