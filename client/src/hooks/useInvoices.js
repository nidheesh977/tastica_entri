import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../config/axiosInstance";

export const useInvoices = () => {
  // const queryClient = useQueryClient();
  // const { data } = useQuery({
  //   queryKey: ["invoices"],
  //   queryFn: async () => {
  //     const response = await axiosInstance({
  //       method: "GET",
  //       url: "/invoice",
  //       withCredentials: true,
  //     });
  //     return response?.data?.data;
  //   },
  // });

  const { mutate: createInvoice } = useMutation({
    mutationFn: async (customerId) => {
      const response = await axiosInstance({
        method: "POST",
        url: `/invoice/${customerId}`,
        withCredentials: true,
      });
      return response?.data?.data;
    },
  });
  
  
  

  return { createInvoice };
};
