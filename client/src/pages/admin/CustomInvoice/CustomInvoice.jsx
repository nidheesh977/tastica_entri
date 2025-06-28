import { CustomInvoiceCard } from "../../../components/shared/CustomInvoiceCard/CustomInvoiceCard";
import { axiosInstance } from "../../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCustomInvoiceData,
  saveCustomInvoiceData,
} from "../../../redux/features/customInvoiceSlice";
import { storeError } from "../../../redux/features/errorSlice";

export const CustomInvoice = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state?.customInvoice?._id);

  const createCustomInvoice = async () => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/invoice/custom/create",
        withCredentials: true,
      });
      dispatch(saveCustomInvoiceData(response?.data?.data));
    } catch (error) {
      dispatch(storeError(error?.response?.data?.message));
    }
  };
  const deleteCustomInvoice = async () => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: `/invoice/custom/${id}`,
        withCredentials: true,
      });

      dispatch(clearCustomInvoiceData(response?.data?.data));
    } catch (error) {
      dispatch(storeError(error?.response?.data?.message));
    }
  };
  return (
    <div className="m-1 flex justify-center items-center mt-10">
      <CustomInvoiceCard
        createInvoice={createCustomInvoice}
        deleteInvoice={deleteCustomInvoice}
      />
    </div>
  );
};
