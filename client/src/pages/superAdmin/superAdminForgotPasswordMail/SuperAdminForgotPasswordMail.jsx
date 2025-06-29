import toast from "react-hot-toast";
import { PasswordResetEmailCard } from "../../../components/shared/PasswordResetEmailCard/PasswordResetEmailCard";
import { axiosInstance } from "../../../config/axiosInstance";

export const SuperAdminForgotPasswordMail = () => {
  const handleEmailSendSuperAdmin = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/password/reset-link",
        withCredentials: true,
        data,
      });

      toast.success("Email send successfully");
      console.log(response?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send email");
    }
  };
  return (
    <div className="flex justify-center m-1">
      <PasswordResetEmailCard handleEmail={handleEmailSendSuperAdmin} role="super-admin" />
    </div>
  );
};
