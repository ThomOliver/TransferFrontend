import React from "react";
import TransferList from "../components/TransferList";

const ListTransfers = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-backgroundPrimary text-white">
      <div className="w-full max-w-6xl space-y-10">
        <TransferList />
      </div>
    </div>
  );
};

export default ListTransfers;