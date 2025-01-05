import React from "react";
import CreateTransferForm from "../components/CreateTransferForm";

const Transfers = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-backgroundPrimary text-white">
      <div className="w-full max-w-6xl space-y-10">
        <CreateTransferForm />
      </div>
    </div>
  );
};

export default Transfers;