import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardInvoice } from "../../../components/shared/ListCardInvoice/ListCardInvoice";
import { useInvoices } from "../../../hooks/useInvoices";
import { useParams } from "react-router-dom";

export const ListCustomerInvoices = () => {
  const { id } = useParams();
  const { customerInvoices } = useInvoices(id);

  return (
    <>
      <SideBar />
      <div className="m-2 my-10 md:flex items-center justify-center">
        <ListCardInvoice
          invoices={customerInvoices?.invoices}
          customer={customerInvoices?.customerName}
        />
      </div>
    </>
  );
};
