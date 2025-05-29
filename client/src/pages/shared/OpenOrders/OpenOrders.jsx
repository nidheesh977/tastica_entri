import { OpenOrderCard } from "../../../components/shared/OpenOrderCard/OpenOrderCard";
import { useInvoices } from "../../../hooks/useInvoices";

export const OpenOrders = () => {
  const { savedInvoices } = useInvoices();

  return (
    <>
      <div className="flex justify-center px-2 mt-10 m-2">
        <div className="border border-primary w-full max-w-[730px] h-[500px] p-5 overflow-hidden flex flex-col">
          <h1 className="text-center text-primary text-3xl py-2 font-thin">
            Open Orders
          </h1>

          <div className="mt-5 flex-1 overflow-y-auto flex flex-wrap gap-2">
            <OpenOrderCard savedInvoices={savedInvoices} />
          </div>
        </div>
      </div>
    </>
  );
};
