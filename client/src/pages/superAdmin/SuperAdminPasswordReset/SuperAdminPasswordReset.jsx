import { useNavigate, useParams } from "react-router-dom";
import { ResetPasswordCard } from "../../../components/shared/ResetPasswordCard/ResetPasswordCard";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";

export const SuperAdminPasswordReset = () => {
  const { token } = useParams();
  const navigate =  useNavigate()
  const handleResetPasswordSuperAdmin = async (data) => {
    try {
      await axiosInstance({
        method: "POST",
        url: `/password/reset/${token}`,
        withCredentials: true,
        data,
      });

      toast.success("Password reset successfully");
      navigate('/super/admin/login')
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed reset password!");
    }
  };
  return (
    <div className="flex justify-center m-1">
      <ResetPasswordCard resetPassword={handleResetPasswordSuperAdmin}  />
    </div>
  );
};
