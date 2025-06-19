import { ResetPasswordCard } from "../../../components/shared/ResetPasswordCard/ResetPasswordCard";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../config/axiosInstance";
import toast from "react-hot-toast";

export const ShopPasswordReset = () => {
  const { shopId } = useParams();

  const handleResetPasswordShop = async (data) => {
    try {
      await axiosInstance({
        method: "PATCH",
        url: `/super-admin/shops/${shopId}`,
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
      <ResetPasswordCard resetPassword={handleResetPasswordShop} />
    </div>
  );
};
