import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../config/axiosInstance"

export const useVendor = () => {

    const { data: vendorData } = useQuery({
        queryKey: ["vendor"],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: "/vendor",
                withCredentials: true
            })

            return response?.data?.data ?? []
        }
    })

    return { vendorData }
}