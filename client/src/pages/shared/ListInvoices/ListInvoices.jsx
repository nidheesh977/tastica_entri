import { ListCardInvoice } from "../../../components/shared/ListCardInvoice/ListCardInvoice";
import { useAdmins } from "../../../hooks/useAdmins";

export const ListInvoices = () => {
  const { invoices } = useAdmins();

  return (
    <>
      <div className="m-2 my-10 md:flex items-center justify-center">
        <ListCardInvoice invoices={invoices} />
      </div>
    </>
  );
};
