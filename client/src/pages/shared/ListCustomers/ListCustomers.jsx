import React from "react";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardCustomer } from "../../../components/shared/ListCardCustomer/ListCardCustomer";

export const ListCustomers = () => {
  return (
    <>
      <SideBar />
      <div className="m-2 my-10 md:flex items-center justify-center">
        <ListCardCustomer />
      </div>
    </>
  );
};
