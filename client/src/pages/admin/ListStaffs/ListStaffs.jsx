import React from "react";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardStaff } from "../../../components/admin/ListCardStaff/ListCardStaff";

export const ListStaffs = () => {
  return (
    <>
      <SideBar />
      <div className=" m-2  my-10 md:flex mt-10 justify-around ">
        <ListCardStaff/>
      </div>
    </>
  );
};
