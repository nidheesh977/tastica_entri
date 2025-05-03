import React from "react";
import { SideBar } from "../../../components/shared/SideBar/SideBar";
import { ListCardUser } from "../../../components/ListCardUser/ListCardUser";

export const ListUsers = () => {
  return (
    <>
      <SideBar />
      <div className="flex  mt-10 justify-around ">
        <ListCardUser />
      </div>
    </>
  );
};
