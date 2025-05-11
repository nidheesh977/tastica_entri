import React from "react";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { AddCustomerCard } from "../../../components/shared/AddCustomerCard/AddCustomerCard";

export const AddNewCustomer = () => {
  return (
    <>
      <SideBar />
      <div className="my-10">
        <AddCustomerCard />
      </div>
    </>
  );
};
