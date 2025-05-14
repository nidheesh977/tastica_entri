import { useState } from "react";

export const ListCardInvoice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const invoiceData = [
    {
      no: 1,
      invoiceNumber: "INV-001",
      staff: "Alice Johnson",
      customer: "John Doe",
      totalDiscount: 50.0,
      totalAmount: 450.0,
    },
    {
      no: 2,
      invoiceNumber: "INV-002",
      staff: "Bob Smith",
      customer: "Jane Roe",
      totalDiscount: 30.0,
      totalAmount: 570.0,
    },
    {
      no: 3,
      invoiceNumber: "INV-003",
      staff: "Carol Lee",
      customer: "Mark Davis",
      totalDiscount: 20.0,
      totalAmount: 620.0,
    },
    {
      no: 4,
      invoiceNumber: "INV-004",
      staff: "Daniel Kim",
      customer: "Emily Clark",
      totalDiscount: 45.0,
      totalAmount: 500.0,
    },
    {
      no: 5,
      invoiceNumber: "INV-005",
      staff: "Eva Brown",
      customer: "Sam Wilson",
      totalDiscount: 60.0,
      totalAmount: 400.0,
    },
    {
      no: 6,
      invoiceNumber: "INV-006",
      staff: "Frank Moore",
      customer: "Olivia Hall",
      totalDiscount: 10.0,
      totalAmount: 700.0,
    },
    {
      no: 7,
      invoiceNumber: "INV-007",
      staff: "Grace Lee",
      customer: "Noah Young",
      totalDiscount: 25.0,
      totalAmount: 650.0,
    },
    {
      no: 8,
      invoiceNumber: "INV-008",
      staff: "Henry Scott",
      customer: "Ava King",
      totalDiscount: 35.0,
      totalAmount: 480.0,
    },
    {
      no: 9,
      invoiceNumber: "INV-009",
      staff: "Isla Wright",
      customer: "Liam Green",
      totalDiscount: 15.0,
      totalAmount: 540.0,
    },
    {
      no: 10,
      invoiceNumber: "INV-010",
      staff: "Jack Hill",
      customer: "Sophia Adams",
      totalDiscount: 50.0,
      totalAmount: 600.0,
    },
    {
      no: 11,
      invoiceNumber: "INV-011",
      staff: "Karen White",
      customer: "Mason Baker",
      totalDiscount: 40.0,
      totalAmount: 590.0,
    },
    {
      no: 12,
      invoiceNumber: "INV-012",
      staff: "Leo Harris",
      customer: "Ella Campbell",
      totalDiscount: 55.0,
      totalAmount: 430.0,
    },
    {
      no: 13,
      invoiceNumber: "INV-013",
      staff: "Mia Lewis",
      customer: "Ethan Perez",
      totalDiscount: 20.0,
      totalAmount: 510.0,
    },
    {
      no: 14,
      invoiceNumber: "INV-014",
      staff: "Nathan Martin",
      customer: "Zoe Turner",
      totalDiscount: 30.0,
      totalAmount: 560.0,
    },
    {
      no: 15,
      invoiceNumber: "INV-015",
      staff: "Olivia Clark",
      customer: "Logan Rivera",
      totalDiscount: 25.0,
      totalAmount: 495.0,
    },
    {
      no: 16,
      invoiceNumber: "INV-016",
      staff: "Paul Walker",
      customer: "Chloe Ramirez",
      totalDiscount: 18.0,
      totalAmount: 610.0,
    },
  ];

  const invoices = invoiceData?.filter((invoice) => {
    const query = searchQuery.toLowerCase();

    return (
      invoice?.invoiceNumber?.toString().toLowerCase().includes(query) ||
      invoice?.staff?.toLowerCase().includes(query) ||
      invoice?.customer.toLowerCase().includes(query) ||
      invoice?.totalDiscount.toString().toLocaleLowerCase().includes(query) ||
      invoice?.totalAmount.toString().toLocaleLowerCase().includes(query)
    );
  });

  return (
    <div className="md:w-5/6 w-full text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-6 text-primary">
          Invoices
        </h1>
        <input
          className="rounded-xl shadow md:col-span-4 outline-primary h-10 p-5 w-full"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-auto h-96 pb-10">
        <table className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base">
          <thead className="bg-primary/10 font-semibold text-black">
            <tr>
              <th className="border border-primary px-4 py-2">No</th>
              <th className="border border-primary px-4 py-2">
                Invoice Number
              </th>
              <th className="border border-primary px-4 py-2">Staff</th>
              <th className="border border-primary px-4 py-2">Customer</th>
              <th className="border border-primary px-4 py-2">
                Total Discount
              </th>
              <th className="border border-primary px-4 py-2">TotalAmount</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.map((invoice, index) => (
              <tr key={invoice?.no} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">
                  {invoice?.no}
                </td>
                <td className="border border-primary px-4 py-2">
                  {invoice?.invoiceNumber}
                </td>
                <td className="border border-primary px-4 py-2">
                  {invoice?.staff}
                </td>
                <td className="border border-primary px-4 py-2">
                  {invoice?.customer}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  {invoice?.totalDiscount}
                </td>
                <td className="border border-primary px-4 py-2 text-center">
                  {invoice?.totalAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
