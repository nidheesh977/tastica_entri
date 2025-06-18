import { ResetPasswordCard } from "../../../components/shared/ResetPasswordCard/ResetPasswordCard";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";

export const EmployeeResetPassword = () => {
  const { employeeId } = useParams();

  const handleResetPasswordEmployee = async (data) => {
    try {
      await axiosInstance({
        method: "PATCH",
        url: `/super-admin/employees/${employeeId}/password`,
        withCredentials: true,
        data,
      });

      toast.success("Password reset successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed reset password!");
    }
  };

  return (
    <div className="flex justify-center m-1">
      <ResetPasswordCard resetPassword={handleResetPasswordEmployee} />
    </div>
  );
};
