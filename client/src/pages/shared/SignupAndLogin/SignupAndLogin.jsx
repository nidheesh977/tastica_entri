import React from "react";
import { Login } from "../../../components/shared/Login/Login";
import { AdminSideBar } from "../../../components/admin/AdminSideBar/AdminSideBar";
import { StaffSideBar } from "../../../components/staff/StaffSideBar/StaffSideBar";

export const SignupAndLogin = ({ action, role , access}) => {
  return (
    <div>
      {access === 'Admin' ? <AdminSideBar/> : <StaffSideBar/>}
      <Login action={action} role={role} />
    </div>
  );
};
