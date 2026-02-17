
import { Controller, useForm } from 'react-hook-form'
import { InputComponent } from '../DaisyUiComponent/InputComponent'
import { SimpleSelectOption } from '../DaisyUiComponent/SimpleSelectOption'
import { useTaxRates } from '../../../hooks/useTaxRates'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, } from "react-redux"
import { removeBackgroundBlur, setCloseTaxRateForm } from "../../../redux/features/commonSlice"


export const TaxRateForm = () => {



    const { handleSubmit, control } = useForm({
        defaultValues: {
            taxCodeName: "",
            rate: "",
            taxType: ""
        }
    })

    const dispatch = useDispatch()


    const { addTaxToAccount, addTaxToAccountLoaded } = useTaxRates()




    const taxTypes = [
        { id: 1, value: "", name: "Select Tax Type" },
        { id: 2, value: "ZERO", name: "ZERO" },
        { id: 3, value: "VAT", name: "VAT" },
        { id: 4, value: "SALES_TAX", name: "SALES_TAX" },
        { id: 5, value: "GST", name: "GST" }
    ]

    const onSubmit = (data) => {
        addTaxToAccount(data);
    }

    const handleTaxAddCancel = () => {
        dispatch(setCloseTaxRateForm(false))
        dispatch(removeBackgroundBlur(false))
    }


    return (
        <div className="fixed w-96 p-5 shadow-md bg-white top-[45%] z-[1000] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="mb-5 flex justify-between items-center">
                <h2 className=" font-semibold">Add tax rates</h2>
                <button onClick={handleTaxAddCancel} className="btn btn-ghost btn-sm">
                    <IoMdClose size={20} />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="label">Tax Name</label>
                <Controller name="taxCodeName" control={control} render={({ field }) => (
                    <InputComponent field={field} regexVal={/./g} placeholder={"Eg. GST"} />
                )} />
                <label className="label mt-2">Tax Rate</label>
                <Controller name="rate" control={control} render={({ field }) => (
                    <InputComponent field={field} placeholder={"Add Tax Rate: 5"} />
                )} />
                <label className="label mt-2">Tax Type</label>
                <Controller name="taxType" control={control} defaultValue={taxTypes[0]?.name} render={({ field }) => (
                    <SimpleSelectOption data={taxTypes} field={field} />
                )} />
                <button disabled={addTaxToAccountLoaded === true} className="btn btn-primary btn-md w-full mt-3 rounded-md">{addTaxToAccountLoaded ? "Creating" : "Create Tax Rates"}</button>
            </form>

        </div>
    )
}
