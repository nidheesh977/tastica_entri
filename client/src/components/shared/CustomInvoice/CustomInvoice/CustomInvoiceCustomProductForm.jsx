import React from 'react'
import { useDispatch } from 'react-redux'
import { removeBackgroundBlur, setOpenCustomProductAddForm } from '../../../../redux/features/commonSlice'
import { IoMdClose } from 'react-icons/io'
import { CustomProductForm } from '../../AddCustomProduct/CustomProductForm'
import { useForm } from 'react-hook-form'
import { useAccount } from '../../../../hooks/useAccount'
import { useInvoiceCustom } from '../../../../hooks/useCustomInvoice/useInvoiceCustom'



export const CustomInvoiceCustomProductForm = ({ setOpenCustomProductForm }) => {

    const { accountsSalesAndPurchaseData } = useAccount()
    const { createCustomProductInCustomInvoice } = useInvoiceCustom()

    const { handleSubmit, control, setValue, watch, register } = useForm({
        defaultValues: {
            productName: "",
            sellingPrice: 0,
            type: "",
            unit: "",
            costPrice: 0,
            salesAccount: "",
            salesAccountDis: "",
            purchaseAccount: "",
            purchaseAccountDis: "",
            purchaseDescription: "",
            salesDescription: ""
        }
    })

    const salesAccountDis = watch("salesAccountDis")
    const purchaseAccountDis = watch("purchaseAccountDis")

    const disptach = useDispatch()

    const handleCustomProductFormCancel = () => {
        disptach(removeBackgroundBlur(false))
        disptach(setOpenCustomProductAddForm(false))
    }

    const onSubmit = (data) => {
        createCustomProductInCustomInvoice(data);

    }

    return (
        <div className="fixed w-96 md:w-[1000px] p-5 shadow-md bg-white top-[55%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md" >
            <div className="mb-5 flex justify-between items-center">
                <h2 className=" font-semibold">Create Product</h2>
                <button className="btn btn-ghost btn-sm" onClick={handleCustomProductFormCancel}>
                    <IoMdClose size={20} />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomProductForm salesAccountDis={salesAccountDis} purchaseAccountDis={purchaseAccountDis} setValue={setValue} accounts={accountsSalesAndPurchaseData} control={control} register={register} />
                <button type='submit' className='btn btn-sm btn-primary w-full mt-5'>Save</button>
            </form>
        </div>
    )
}
