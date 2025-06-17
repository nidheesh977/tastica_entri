import { useEffect, useState } from "react";

import { dark, medium, light } from "../../../../utils/constants";
import { useDashboard } from "../../../hooks/useDashboard";

export const SalesPerformance = () => {
  const [date, setDate] = useState("");
  const [year, setYear] = useState(0);
  const [customYear, setCustomYear] = useState(0);
  const [month, setMonth] = useState("");
  const [customMonth, setCustomMonth] = useState("");
  const [day, setDay] = useState("");
  const { dateSales, yearSales, monthSales } = useDashboard(
    year,
    month,
    day,
    customMonth,
    customYear
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setYear(year);
    setMonth(month);
    setCustomMonth(month);
    setCustomYear(year);
    setDay(day);
    setDate(`${year}-${month}-${day}`);
  }, []);

  const handleDateChange = (e) => {
    const value = e.target.value;
    const [year, month, day] = value.split("-");

    setYear(year);
    setMonth(month);
    setDay(day);
    setDate(value);
  };

  const isToday = (inputDate) => {
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    return inputDate === formattedToday;
  };

  return (
    <div className="border flex flex-col gap-1 rounded shadow p-2 w-full md:h-96">
      <h1 className="font-semibold mb-2">Sales Performance</h1>

      <div>
        <div
          style={{ background: `${dark}` }}
          className=" flex justify-between px-4  text-tertiary text-center font-bold py-2"
        >
          {isToday(date) ? "Today" : "Date"}
          <input
            onChange={(e) => handleDateChange(e)}
            value={date}
            className="accent-white"
            style={{ background: `${dark}` }}
            type="date"
          />
        </div>
        <div className="grid grid-cols-12">
          <div
            style={{ background: `${dark}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Cash MVR
            {dateSales?.date?.paymentMethod?.[0]?.roundedTotalAmount || 0}
          </div>
          <div
            style={{ background: `${dark}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Swipe MVR
            {dateSales?.date?.paymentMethod?.[1]?.roundedTotalAmount || 0}
          </div>
          <div
            style={{ background: `${dark}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white"
          >
            Stripe MVR
            {dateSales?.date?.paymentMethod?.[2]?.roundedTotalAmount || 0}
          </div>
          <div
            style={{ background: `${dark}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Total MVR{dateSales?.date?.grandTotal?.roundedTotalAmount}
          </div>
        </div>
      </div>

      <div>
        <div
          style={{ background: `${medium}` }}
          className=" flex justify-between px-4  text-tertiary text-center font-bold py-2 "
        >
          Month
          <span>{monthNames[Number(customMonth - 1)]}</span>
          <input
            onChange={(e) => {
              setCustomMonth(e.currentTarget.value);
              setYear(year);
            }}
            value={customMonth}
            className="accent-white border border-tertiary text-center"
            style={{ background: `${medium}` }}
            type="number"
            min="1"
            max="12"
          />
        </div>
        <div className="grid grid-cols-12 w-full">
          <div
            style={{ background: `${medium}` }}
            className=" col-span-12 md:col-span-3 border  p-3  text-sm font-semibold text-center text-white "
          >
            Cash MVR
            {dateSales?.date?.paymentMethod?.[0]?.roundedTotalAmount || 0}
          </div>
          <div
            style={{ background: `${medium}` }}
            className="col-span-12 md:col-span-3 border  p-3  text-sm font-semibold text-center text-white "
          >
            Swipe MVR
            {dateSales?.date?.paymentMethod?.[1]?.roundedTotalAmount || 0}
          </div>
          <div
            style={{ background: `${medium}` }}
            className="col-span-12 md:col-span-3 border  p-3  text-sm font-semibold text-center text-white "
          >
            Stripe MVR
            {dateSales?.date?.paymentMethod?.[2]?.roundedTotalAmount || 0}
          </div>
          <div
            style={{ background: `${medium}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Total MVR{monthSales?.date?.grandTotal?.roundedTotalAmount}
          </div>
        </div>
      </div>
      <div>
        <div
          style={{ background: `${light}` }}
          className=" flex justify-between px-4 text-tertiary text-center font-bold py-2"
        >
          Year
          <span>{customYear}</span>
          <input
            className="accent-white border border-tertiary text-center"
            style={{ background: `${light}` }}
            type="number"
            value={customYear}
            min="1900"
            max="2100"
            onChange={(e) => setCustomYear(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-12 w-full">
          <div
            style={{ background: `${light}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Cash MVR
            {dateSales?.date?.paymentMethod?.[0]?.roundedTotalAmount || 0}
          </div>
          <div
            style={{ background: `${light}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Swipe MVR
            {dateSales?.date?.paymentMethod?.[1]?.roundedTotalAmount || 0}
          </div>
          <div
            style={{ background: `${light}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Stripe MVR
            {dateSales?.date?.paymentMethod?.[2]?.roundedTotalAmount || 0}
          </div>
          <div
            style={{ background: `${light}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Total MVR{yearSales?.date?.grandTotal?.roundedTotalAmount}
          </div>
        </div>
      </div>
    </div>
  );
};
