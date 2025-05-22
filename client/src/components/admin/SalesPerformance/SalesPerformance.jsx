import React, { useEffect, useState } from "react";
import { useAdmins } from "../../../hooks/useAdmins"; 

export const SalesPerformance = () => {
  const { invoices } = useAdmins();
  const [todayTotal, setTodayTotal] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);

  useEffect(() => {
    if (!invoices || invoices.length === 0) return;

    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));

    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay() + 1); 

    const startOfMonth = new Date(startOfToday.getFullYear(), startOfToday.getMonth(), 1);

    let today = 0;
    let week = 0;
    let month = 0;

    invoices.forEach((invoice) => {
      const createdAt = new Date(invoice.createdAt);
      const amount = invoice.totalAmount || 0;

      if (createdAt >= startOfMonth) month += amount;
      if (createdAt >= startOfWeek) week += amount;
      if (createdAt >= startOfToday) today += amount;
    });

    setTodayTotal(today);
    setWeekTotal(week);
    setMonthTotal(month);
  }, [invoices]);

  return (
    <div className="border flex flex-col gap-2 rounded shadow p-10 w-full md:h-96">
      <h1 className="font-semibold mb-6">Sales Performance</h1>
      <div className="border border-[#4BC0C0FF] p-5 bg-[#4BC0C099] text-xl font-semibold text-center text-white">
        Today ₹{todayTotal.toLocaleString("en-IN")}
      </div>
      <div className="border border-[#36A2EBFF] p-5 bg-[#36A2EB99] text-xl font-semibold text-center text-white">
        This Week ₹{weekTotal.toLocaleString("en-IN")}
      </div>
      <div className="border border-[#9966FFFF] p-5 bg-[#9966FF99] text-xl font-semibold text-center text-white">
        This Month ₹{monthTotal.toLocaleString("en-IN")}
      </div>
    </div>
  );
};
