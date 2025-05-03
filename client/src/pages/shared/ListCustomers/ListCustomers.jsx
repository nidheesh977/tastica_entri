import React from "react";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardCustomer } from "../../../components/shared/ListCardCustomer/ListCardCustomer";

export const ListCustomers = () => {
  return (
    <>
      <SideBar />
      <div className="flex  mt-10 justify-around ">
        <ListCardCustomer />
      </div>
    </>
  );
};
