import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardInvoice } from "../../../components/shared/ListCardInvoice/ListCardInvoice";

export const ListCustomers = () => {
  return (
    <>
      <SideBar />
      <div className="m-2 my-10 md:flex items-center justify-center">
        <ListCardInvoice />
      </div>
    </>
  );
};
