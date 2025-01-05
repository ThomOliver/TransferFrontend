import React, { useContext } from "react";
import { TransferContext } from "../context/TransferContext"; 

const TransferList = () => {
  const { transfers, selectedTransfer, fetchTransferDetails, loading } = useContext(TransferContext);

  if (loading) {
    return <p>Carregando transferências...</p>;
  }
  console.log("selectedTransfer", selectedTransfer)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-backgroundPrimary text-white p-4">
      <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-6 text-buttonColor text-center">
        Transferências
      </h1>
      <p className="text-lg md:text-xl text-center max-w-md mb-6 text-textColor">
        Veja a lista de transferências e clique em uma para ver mais detalhes.
      </p>
      <div className="w-full max-w-4xl overflow-hidden border border-gray-300 rounded-lg">
        <div className="max-h-80 overflow-y-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-700 text-white sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2">ID Externo</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2">Data Esperada</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transfers.length > 0 ? (
                transfers.map((transfer) => (
                  <tr
                    key={transfer.id}
                    onClick={() => fetchTransferDetails(transfer.id)}
                    className="cursor-pointer hover:bg-gray-800"
                  >
                    <td className="px-4 py-2">{transfer.externalId}</td>
                    <td className="px-4 py-2">{transfer.amount}</td>
                    <td className="px-4 py-2">
                      {new Date(transfer.expectedOn).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      {transfer.settlementReference === "" ? "Pendente": "Sucesso"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-400"
                  >
                    Nenhuma transferência encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTransfer && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md text-gray-800 max-w-lg w-full">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Detalhes da Transferência
          </h3>
          <p className="mb-2">
            <strong>ID Externo:</strong> {selectedTransfer.externalId}
          </p>
          <p className="mb-2">
            <strong>Valor:</strong> {selectedTransfer.amount}
          </p>
          <p className="mb-2">
            <strong>Data Esperada:</strong>{" "}
            {new Date(selectedTransfer.expectedOn).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong>Data da Transferência:</strong>{" "}
            {new Date(selectedTransfer.transfer_date).toLocaleString()}
          </p>
          <p className="mb-2">
            <strong>Status:</strong>{" "}
            {selectedTransfer.settlementReference === "" ? "Pendente": "Sucesso"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TransferList; 