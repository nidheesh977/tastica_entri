import React from "react";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardCategory } from "../../../components/shared/ListCardCategory/ListCardCategory";

export const ListCategories = () => {
  return (
    <>
      <SideBar />
      <div className="flex  mt-10 justify-around ">
        <ListCardCategory />
      </div>
    </>
  );
};
