import toast from "react-hot-toast";
import { PermissionCard } from "../../../components/shared/PermissionCard/PermissionCard";
import { axiosInstance } from "../../../config/axiosInstance";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Permissions = () => {
  const { id } = useParams();
  const shopId = useSelector((state) => state?.auth?.shopData?._id);
  const [permissionData, setPermissionData] = useState([]);
  const addPermission = async (permission) => {
    try {
      await axiosInstance({
        method: "PATCH",
        url: `/admin/staff/${id}/permissions`,
        withCredentials: true,
        data: { permission },
      });
      toast.success("Permission updated");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update permission!"
      );
    }
  };
  const removePermission = async (permission) => {
    try {
      await axiosInstance({
        method: "DELETE",
        url: `/admin/staff/${id}/permissions`,
        withCredentials: true,
        data: { permission },
      });
      toast.success("Permission updated");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update permission!"
      );
    }
  };

  const adminHasPermission = (permission) =>
    permissionData.includes(permission);

  const getStaffPermission = async () => {
    if (!shopId) return;
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `/admin/staff/${id}/${shopId}`,
      });
      setPermissionData(response?.data?.data?.permissions);

      toast.success("Permissions fetched successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch permissions!"
      );
    }
  };

  useEffect(() => {
    if (shopId) {
      getStaffPermission();
    }
  }, [shopId]);
  const togglePermissionAdmin = (permission) => {
    const has = adminHasPermission(permission);
    if (has) {
      removePermission(permission);
      setPermissionData((prev) => prev.filter((p) => p !== permission));
    } else {
      addPermission(permission);
      setPermissionData((prev) => [...prev, permission]);
    }
  };

  return (
    <>
      <div className=" m-2  my-10 md:flex mt-10 justify-around ">
        <PermissionCard
          togglePermission={togglePermissionAdmin}
          hasPermission={adminHasPermission}
        />
      </div>
    </>
  );
};
