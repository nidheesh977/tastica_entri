import { StaffSignup } from "../../../components/staff/StaffSignup/StaffSignup";
import { AdminSideBar } from "../../../components/admin/AdminSideBar/AdminSideBar";

export const StaffSignupPage = () => {
  return (
    <>
      <AdminSideBar />
      <div className="flex justify-center m-1">
        <StaffSignup />
      </div>
    </>
  );
};
