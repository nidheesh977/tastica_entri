import { useEffect, useState } from "react";

import { dark, medium, light } from "../../../utils/constants";

export const SalesPerformance = () => {
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [method, setMethod] = useState("");
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
    setDay(day);
    setDate(`${year}-${month}-${day}`);
  }, []);

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
          className=" flex justify-between px-4 text-tertiary text-center font-bold py-2"
        >
          {isToday(date) ? "Today" : "Date"}
          <input
            onChange={(e) => setDate(e.currentTarget.value)}
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
            Cash MVR1200
          </div>
          <di
            style={{ background: `${dark}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Swipe MVR1220
          </di>
          <div
            style={{ background: `${dark}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white"
          >
            Stripe MVR1550
          </div>
          <div
            style={{ background: `${dark}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Total MVR4500
          </div>
        </div>
      </div>

      <div>
        <div
          style={{ background: `${medium}` }}
          className=" flex justify-between px-4  text-tertiary text-center font-bold py-2 "
        >
          Month
          <span>{monthNames[Number(month - 1)]}</span>
          <input
            onChange={(e) => setMonth(e.currentTarget.value)}
            value={month}
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
            Cash MVR1200
          </div>
          <div
            style={{ background: `${medium}` }}
            className="col-span-12 md:col-span-3 border  p-3  text-sm font-semibold text-center text-white "
          >
            Swipe MVR1220
          </div>
          <div
            style={{ background: `${medium}` }}
            className="col-span-12 md:col-span-3 border  p-3  text-sm font-semibold text-center text-white "
          >
            Stripe MVR1550
          </div>
          <div
            style={{ background: `${medium}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Total MVR4500
          </div>
        </div>
      </div>
      <div>
        <div
          style={{ background: `${light}` }}
          className=" flex justify-between px-4 text-tertiary text-center font-bold py-2"
        >
          Year
          <span>{year}</span>
          <input
            onChange={(e) => setYear(e.currentTarget.value)}
            value={year}
            className="accent-white border border-tertiary text-center"
            style={{ background: `${light}` }}
            type="number"
            min="1900"
            max="2100"
          />
        </div>
        <div className="grid grid-cols-12 w-full">
          <div
            style={{ background: `${light}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Cash MVR1200
          </div>
          <div
            style={{ background: `${light}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Swipe MVR1220
          </div>
          <div
            style={{ background: `${light}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Stripe MVR1550
          </div>
          <div
            style={{ background: `${light}` }}
            className="border col-span-12 md:col-span-3  p-3  text-sm font-semibold text-center text-white "
          >
            Total MVR4500
          </div>
        </div>
      </div>
    </div>
  );
};
