import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardInvoice } from "../../../components/shared/ListCardInvoice/ListCardInvoice";
import { useInvoices } from "../../../hooks/useInvoices";

export const ListInvoices = () => {
  const { invoices } = useInvoices();
  return (
    <>
      <SideBar />
      <div className="m-2 my-10 md:flex items-center justify-center">
        <ListCardInvoice invoices={invoices} />
      </div>
    </>
  );
};
