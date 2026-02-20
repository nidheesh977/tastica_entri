import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from '../config/axiosInstance'
import { useLocation, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { removeBackgroundBlur, setCloseVendorStaffForm } from "../redux/features/commonSlice"


export const useVendorStaff = (vendorStatus) => {

    const { vendorIdForStaff } = useSelector(state => state.common)

    const validId = vendorStatus ?? vendorIdForStaff


    const { pathname } = useLocation()

    const queryClient = useQueryClient();

    const { id: vendorId } = useParams()

    const isValidPage = pathname === "/admin/expense/create"
    const isValidvendorStaffPage = pathname === `/admin/vendor/${vendorId}/staff` || pathname === `/staff/vendor/${vendorId}/staff`

    console.log(isValidvendorStaffPage);


    const dispatch = useDispatch()

    const { data: vendorStaffDataForForm, refetch } = useQuery({
        queryKey: ["vendorStaffForm", validId],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/vendor/staff/form/${validId}`,
                withCredentials: true
            })
            return response?.data?.data ?? []
        },
        enabled: false
    })

    const { data: vendorStaffData, isLoading: vendorStaffDataLoding, isFetching: vendorStaffDataRefreshing } = useQuery({
        queryKey: ["vendorStaff", vendorId],
        queryFn: async () => {
            const response = await axiosInstance({
                method: "GET",
                url: `/vendor/${vendorId}/staff`,
                withCredentials: true
            })
            return response?.data?.data ?? []
        },
        enabled: !!vendorId && isValidvendorStaffPage,
        staleTime: 3 * 60 * 1000,


    })

    const { mutate: createStaff, isPending: vendorStaffPending, isSuccess: vendorStaffSuccess } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "POST",
                url: "/vendor/staff/create",
                withCredentials: true,
                data: data
            })
        },
        onSuccess: async (data) => {
            dispatch(removeBackgroundBlur(false))
            dispatch(setCloseVendorStaffForm(false))
            toast.success("staff create successfully")
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ["vendorStaff"] }),
                queryClient.invalidateQueries({ queryKey: ["vendorStaffForm"] })

            ])
            refetch()
        },
        onError(error) {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        }
    })

    const { mutate: changeVendorStaffStatus, isPending: statusUploadLoading, isSuccess: vendorStaffStatusSuccess } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosInstance({
                method: "PATCH",
                url: `/vendor/staff/${vendorId}`,
                withCredentials: true,
                data
            })

            return response?.data
        }, onSuccess(data) {
            dispatch(removeBackgroundBlur(false))
            toast.success(data?.message)
            queryClient.invalidateQueries({ queryKey: ["vendorStaff"] });

        },
        onError(error) {
            toast.error(
                error?.response?.data?.message || "Something error"
            );
        }
    })


    return {
        vendorStaffDataForForm,
        vendorStaffData,
        vendorStaffDataLoding,
        vendorStaffDataRefreshing,

        refetch,

        createStaff,
        vendorStaffPending,
        vendorStaffSuccess,

        changeVendorStaffStatus,
        statusUploadLoading,
        vendorStaffStatusSuccess
    }
}
