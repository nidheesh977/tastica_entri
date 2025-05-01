import React from "react";
import { Login } from "../../../components/shared/Login/Login";
import { SideBar } from "../../../components/shared/SideBar/SideBar";


export const SignupAndLogin = ({ action, role }) => {
  return (
    <>
      <SideBar/>
      <Login action={action} role={role} />
    </>
  );
};
