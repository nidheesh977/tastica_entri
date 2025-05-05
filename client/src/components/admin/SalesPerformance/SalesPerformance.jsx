import React from "react";

export const SalesPerformance = () => {
  return (
    <>
      <div className="border flex flex-col gap-2  rounded shadow p-10 w-full md:h-96 ">
        <h1 className="font-semibold mb-6">Sales Performance</h1>
        <div className="border  border-[#4BC0C0FF] p-5  bg-[#4BC0C099]  text-xl font-semibold text-center text-white">
          Today ₹2004870
        </div>
        <div className="border border-[#36A2EBFF] p-5 bg-[#36A2EB99] text-xl font-semibold text-center text-white">
          This Week ₹32004870
        </div>
        <div className="border border-[#9966FFFF] p-5 bg-[#9966FF99] text-xl font-semibold text-center text-white">
          This Month ₹40048870
        </div>
      </div>
    </>
  );
};
