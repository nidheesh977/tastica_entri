import { useParams } from "react-router-dom";
import { useInvoices } from "../../../hooks/useInvoices";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const InvoiceDataCard = () => {
  const { id } = useParams();
  const { singleInvoice, refund } = useInvoices();
  const [discountAmount, setDiscountAmount] = useState(0);
  const currency = useSelector((state) => state?.auth?.shopData?.currencyCode);
  useEffect(() => {
    if (id) {
      singleInvoice({ singleInvoiceId: id });
    }
  }, [id]);

  const invoice = useSelector((state) => state?.singleInvoice);

  const products = invoice?.products;

  return (
    <div className="md:w-5/6 w-full text-center pt-5 pb-14 px-5 border border-primary h-full shadow">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center mb-4">
        <h1 className="font-thin text-start md:col-span-8 text-3xl my-3 text-primary">
          Invoice No {invoice?.invoiceNumber}
        </h1>
      </div>

      <div className="overflow-auto h-96 pb-10">
        <table className="min-w-[768px] w-full border border-primary text-left text-sm sm:text-base">
          <thead className="bg-primary/10 font-semibold text-black">
            <tr>
              <th className="border border-primary px-4 py-2">No</th>
              <th className="border border-primary px-4 py-2">Product Name</th>
              <th className="border border-primary px-4 py-2">Quantity</th>
              <th className="border border-primary px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={product?._id} className="border-t border-primary">
                <td className="border border-primary px-4 py-2">{index + 1}</td>
                <td className="border border-primary px-4 py-2">
                  {product?.productName}
                </td>
                <td className="border border-primary px-4 py-2">
                  {product?.quantity}
                </td>
                <td className="border border-primary px-4 py-2">
                  {product?.price * product?.quantity}
                </td>
              </tr>
            ))}

            <tr className="font-semibold py-4 border-t border-primary">
              <td className="border-r border-primary">Total Discount:</td>
              <td></td>
              <td></td>
              <td className="border-l border-primary">
                {invoice?.totalDiscount}
                {currency}
              </td>
            </tr>
            <tr className="font-semibold py-4 border-t border-r border-primary">
              <td className="border-r border-primary">Refund:</td>
              <td></td>
              <td></td>
              <td className="border-l border-primary">
                <input
                  type="text"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  onBlur={() => {
                    refund(
                      { id: invoice?._id, amount: discountAmount },
                      {
                        onSuccess: () => {
                          singleInvoice({ singleInvoiceId: invoice?._id });
                        },
                      },
                    );
                  }}
                />
              </td>
            </tr>
            <tr className="font-semibold py-4 border-t border-r border-primary">
              <td className="border-r border-primary">Total:</td>
              <td></td>
              <td></td>
              <td className="border-l border-primary">
                {invoice?.totalAmount}
                {currency}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
