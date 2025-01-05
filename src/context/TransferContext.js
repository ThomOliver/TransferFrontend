import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const TransferContext = createContext();

export const TransferProvider = ({ children }) => {
  const [transfers, setTransfers] = useState([]);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTransfers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/transfers");
      setTransfers(response.data);
    } catch (error) {
      console.error("Erro ao buscar transferências:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransferDetails = async (id) => {
    setLoading(true);
    try {
        const response = await api.get(`/transfers/${id}`);
      setSelectedTransfer(response.data.transfer);
    } catch (error) {
      console.error("Erro ao buscar detalhes da transferência:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTransfer = async (data) => {
    try {
      const response = await api.post("/transfers", data);
      await fetchTransfers(); 
      return response.data;
    } catch (error) {
      console.error("Erro ao criar transferência:", error);
      throw error;
    }
  };

  return (
    <TransferContext.Provider
      value={{
        transfers,
        selectedTransfer,
        fetchTransferDetails,
        createTransfer,
        loading,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};