import { Controller, } from 'react-hook-form'
import { InputComponent } from '../../DaisyUiComponent/InputComponent'
import { SimpleSelectOption } from '../../DaisyUiComponent/SimpleSelectOption'



export const CustomInvoiceCustomerAddForm = ({ control, setOpenForm, customerTypeSelect }) => {









    const customerType = [
        { id: 1, value: "", name: "Select Customer Type" },
        { id: 2, value: "individual", name: "Individual" },
        { id: 3, value: "business", name: "Business" },
    ]

    const salutation = [
        { id: 1, value: "", name: "Select Salutation" },
        { id: 2, value: "Mr.", name: "Mr." },
        { id: 3, value: "Mrs.", name: "Mrs." },
        { id: 4, value: "Ms.", name: "Ms." },
        { id: 5, value: "M/s.", name: "M/s." },
    ]





    const businessPrimaryContact = (
        <div className='flex flex-col lg:mt-5 lg:flex-row mt-2 items-start lg:items-center  justify-start w-full'>
            <label className="label  text-sm w-32">Primary Contact</label>
            <div className='flex flex-col lg:flex-row justify-between w-full gap-3'>
                <Controller name="salutation" control={control} render={({ field }) => (
                    <SimpleSelectOption field={field} data={salutation} classNames="select-sm" />
                )} />
                <Controller name="firstName" control={control} render={({ field }) => (
                    <InputComponent field={field} regexVal={/\b\w/g} placeholder={"First Name"} classNames="input-sm" />
                )} />
                <Controller name="lastName" control={control} render={({ field }) => (
                    <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Last Name"} classNames="input-sm" />
                )} />
            </div>
        </div>
    )

    const customerName = (
        <div className='flex-col flex-1 w-full'>
            <label className="label text-sm flex-block">Customer Name</label>
            <Controller name="customerName" control={control} render={({ field }) => (
                <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Customer Name"} classNames="input-sm" />
            )} />
        </div>
    )

    const businessName = (
        <div className='flex gap-2'>
            <div className='flex-col flex-1 w-full'>
                <label className="label text-sm flex-block">Business Name</label>
                <Controller name="businessName" control={control} render={({ field }) => (
                    <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Business Name"} classNames="input-sm" />
                )} />
            </div>
        </div>
    )

    return (
        <div >



            <div className='flex flex-col justify-start items-start w-full '>
                <label className="label text-sm w-full sm:w-36">Customer Type</label>
                <Controller name="customerType" control={control} defaultValue='Select Customer Type' render={({ field }) => (
                    <SimpleSelectOption field={field} data={customerType} classNames="select-sm " />
                )} />
            </div>

            <hr className='mt-5 lg:hidden bg-gray-400' />
            {customerTypeSelect === "business" ? businessPrimaryContact : customerName}

            <hr className='mt-5 lg:hidden bg-gray-400' />

            {customerTypeSelect === "business" ? businessName : null}

            <div className='flex items-center w-full gap-2'>
                <div className='flex-1'>
                    <label className="label text-sm ">Display Name</label>
                    <Controller name="displayName" control={control} render={({ field }) => (
                        <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Display Name"} classNames="input-sm" />
                    )} />
                </div>
                <div className='flex-1'>

                    <label className="label text-sm">Email</label>
                    <Controller name="email" control={control} render={({ field }) => (
                        <InputComponent field={field} regexVal={/[a-z]/g} placeholder={"Enter email"} lowerCase={true} classNames="input-sm" />
                    )} />
                </div>
            </div>

            <label className="label text-sm">Phone Number</label>
            <Controller name="phoneNumber" control={control} render={({ field }) => (
                <InputComponent field={field} regexVal={/[a-z]/g} placeholder={"Enter phone number"} lowerCase={true} classNames="input-sm" />
            )} />





        </div>
    )
}
