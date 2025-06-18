import { ResetPasswordCard } from "../../../components/shared/ResetPasswordCard/ResetPasswordCard";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";

export const StaffPasswordReset = () => {
  const { staffId } = useParams();

  const handleResetPasswordStaff = async (data) => {
    try {
      await axiosInstance({
        method: "PATCH",
        url: `/admin/staff/${staffId}/password`,
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
      <ResetPasswordCard resetPassword={handleResetPasswordStaff} />
    </div>
  );
};
