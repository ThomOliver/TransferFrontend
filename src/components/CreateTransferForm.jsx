import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TransferContext } from "../context/TransferContext";

const schema = yup.object().shape({
  externalId: yup.string().required("O External ID é obrigatório."),
  amount: yup
    .string()
    .required("O valor é obrigatório.")
    .matches(/^\d+(\.\d{1,2})?$/, "Deve ser um número com até duas casas decimais.")
    .test("is-positive", "Deve ser um valor positivo.", (value) => parseFloat(value) > 0),
  expectedOn: yup.date().required("A data é obrigatória."),
});

const CreateTransferForm = () => {
  const { createTransfer } = useContext(TransferContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await createTransfer({
        ...data,
        amount: parseFloat(data.amount),
      });
      toast.success("Transferência criada com sucesso!");
      navigate("/listTransfers");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Erro ao criar transferência.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-backgroundPrimary text-white p-4">
      <h1 className="text-4xl md:text-5xl font-bold tracking-wide mb-6 text-buttonColor text-center">
        Criar Transferência
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md text-gray-900"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            External ID:
          </label>
          <input
            {...register("externalId")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm mt-1">{errors.externalId?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Valor:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("amount")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onWheel={(e) => e.target.blur()}
            onInput={(e) => {
              const value = e.target.value;
              if (!/^\d*(\.\d{0,2})?$/.test(value)) {
                e.target.value = value.slice(0, -1);
              }
            }}
          />

          <p className="text-red-500 text-sm mt-1">{errors.amount?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Data Esperada:</label>
          <input
            type="date"
            {...register("expectedOn")}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm mt-1">{errors.expectedOn?.message}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-hoverButtonColor text-white py-2 px-4 rounded-lg hover:bg-backgroundPrimary hover:text-hoverButtonColor transition duration-300"
        >
          Criar Transferência
        </button>
      </form>
    </div>
  );
};

export default CreateTransferForm;   