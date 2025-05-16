import { OpenOrderCard } from "../../../components/shared/OpenOrderCard/Product";
import { SideBar } from "../../../components/shared/SideBar/SideBar";

export const OpenOrders = () => {
  return (
    <>
      <SideBar />
      <div className="flex justify-center px-2 mt-10 m-2">
        <div className="border border-primary w-full max-w-[800px] h-[500px] p-5 overflow-hidden flex flex-col">
          <h1 className="text-center text-primary text-3xl py-2 font-thin">
            Open Orders
          </h1>

          <div className="mt-5 flex-1 overflow-y-auto flex flex-wrap gap-2">
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
            <OpenOrderCard />
          </div>
        </div>
      </div>
    </>
  );
};
