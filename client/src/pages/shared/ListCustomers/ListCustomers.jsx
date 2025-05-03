import React from "react";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardCustomer } from "../../../components/shared/ListCardCustomer/ListCardCustomer";

export const ListCustomers = () => {
  return (
    <>
      <SideBar />
      <div className="md:flex items-center justify-center mt-10">
        <ListCardCustomer />
      </div>
    </>
  );
};
