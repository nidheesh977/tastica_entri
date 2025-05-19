import { InvoiceDataCard } from "../../../components/shared/InvoiceDataCard/InvoiceDataCard";
import { SideBar } from "../../../components/shared/SideBar/SideBar";


export const InvoiceData = () => {
  
  return (
    <>
      <SideBar />
      <div className="flex items-center justify-center mt-20 m-2">
      <InvoiceDataCard />

      </div>
    </>
  );
};
