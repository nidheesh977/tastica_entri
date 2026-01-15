import { useState } from "react";
import { ListCardInvoice } from "../../../components/shared/ListCardInvoice/ListCardInvoice";
import { useAdmins } from "../../../hooks/useAdmins";
import { useInvoices } from "../../../hooks/useInvoices";

export const ListInvoices = () => {
  const [status, setStatus] = useState("paid");
  const { invoices } = useAdmins(status);
  const { handleInvoiceDelete } = useInvoices();



  return (
    <>
      <div className="m-2 my-10 md:flex items-center justify-center">
        <ListCardInvoice
          invoices={invoices}
          setStatus={setStatus}
          handleInvoiceDelete={handleInvoiceDelete}
        />
      </div>
    </>
  );
};
