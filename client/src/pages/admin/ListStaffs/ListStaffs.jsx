import React from "react";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCard } from "../../../components/ListCard/ListCard";

export const ListStaffs = () => {
  return (
    <>
      <SideBar />
      <div className="flex  mt-10 justify-around ">
        <ListCard />
      </div>
    </>
  );
};
