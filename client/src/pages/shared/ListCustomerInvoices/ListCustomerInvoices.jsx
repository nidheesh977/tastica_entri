import { useState } from "react";
import { ListCardInvoice } from "../../../components/shared/ListCardInvoice/ListCardInvoice";
import { useInvoices } from "../../../hooks/useInvoices";
import { useParams } from "react-router-dom";

export const ListCustomerInvoices = () => {
  const { id } = useParams();
  const { customerInvoices } = useInvoices(id);
  const [status] = useState(null)

  return (
    <>
      <div className="m-2 my-10 md:flex items-center justify-center">
        <ListCardInvoice invoices={customerInvoices?.invoices} setStatus={status} set />
      </div>
    </>
  );
};
