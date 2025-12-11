import { useEffect } from "react";
import { dark, medium, light } from "../../../utils/constants";
import { useSelector } from "react-redux"

export const SalesPerformance = ({
  date,
  customMonth,
  customYear,
  setYear,
  setDate,
  setMonth,
  setCustomMonth,
  setCustomYear,
  setDay,
  dateSales,
  yearSales,
  monthSales,
}) => {


  const { shopData } = useSelector((state) => state.auth)





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
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    setYear(y);
    setMonth(m);
    setCustomMonth(m);
    setCustomYear(y);
    setDay(d);
    setDate(`${y}-${m}-${d}`);
  }, []);

  const handleDateChange = (e) => {
    const value = e.target.value;
    const [y, m, d] = value.split("-");
    setYear(y);
    setMonth(m);
    setDay(d);
    setDate(value);
  };

  const isToday = (inputDate) => {
    const today = new Date().toISOString().split("T")[0];
    return inputDate === today;
  };

  const renderStats = (bgColor, sales) => {
    const methods = [
      { key: "cash", label: "Cash" },
      { key: "internal-device", label: "Swipe" },
      { key: "digital", label: "Stripe" },
    ];

    const methodData = sales?.date?.paymentMethod || [];

    return (
      <div className="grid grid-cols-12 text-white">
        {methods.map(({ key, label }) => {
          const item = methodData.find(
            (entry) => entry?.paymentType?.paymentMethod === key
          );
          const amount = item?.roundedTotalAmount || 0;

          return (
            <div
              key={key}
              className="col-span-12 md:col-span-3 text-center font-semibold text-sm p-2 border"
              style={{ background: bgColor }}
            >
              {label} {shopData?.currencyCode || ""}
              <br />
              {amount}
            </div>
          );
        })}

        <div
          className="col-span-12 md:col-span-3 text-center font-semibold text-sm p-2 border"
          style={{ background: bgColor }}
        >
          Total {shopData?.currencyCode || ""}
          <br />
          {sales?.date?.grandTotal?.roundedTotalAmount || 0}
        </div>
      </div>
    );
  };

  return (
    <div className="border rounded shadow p-2 w-full h-full xl:h-[332px] flex flex-col gap-[3px] overflow-auto">
      <h1 className="font-semibold text-sm xl:text-base pb-1">
        Sales Performance:
      </h1>

      <div>
        <div
          className="flex justify-between items-center px-4 py-1 text-tertiary font-bold"
          style={{ background: dark }}
        >
          <span>{isToday(date) ? "Today" : "Date"}</span>
          <input
            onChange={handleDateChange}
            value={date}
            type="date"
            className="accent-white text-white bg-transparent"
          />
        </div>
        {renderStats(dark, dateSales)}
      </div>

      <div>
        <div
          className="flex justify-between items-center px-4 py-1 text-tertiary font-bold"
          style={{ background: medium }}
        >
          <span>Month: {monthNames[customMonth - 1]}</span>
          <input
            type="number"
            min="1"
            max="12"
            value={customMonth}
            onChange={(e) => setCustomMonth(e.target.value)}
            className="text-center border border-tertiary text-white bg-transparent w-20"
          />
        </div>
        {renderStats(medium, monthSales)}
      </div>

      <div>
        <div
          className="flex justify-between items-center px-4 py-1 text-tertiary font-bold"
          style={{ background: light }}
        >
          <span>Year: {customYear}</span>
          <input
            type="number"
            min="1900"
            max="2100"
            value={customYear}
            onChange={(e) => setCustomYear(e.target.value)}
            className="text-center border border-tertiary text-white bg-transparent w-24"
          />
        </div>
        {renderStats(light, yearSales)}
      </div>
    </div>
  );
};
