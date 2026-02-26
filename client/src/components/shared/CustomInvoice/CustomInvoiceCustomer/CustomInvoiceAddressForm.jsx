import React from 'react'
import { InputComponent } from '../../DaisyUiComponent/InputComponent'
import { Controller } from 'react-hook-form'
import { TextAreaComponent } from '../../DaisyUiComponent/TextAreaComponent'
import { SimpleSelectOption } from '../../DaisyUiComponent/SimpleSelectOption'

export const CustomInvoiceAddressForm = ({ control }) => {

    const country = [
        { id: 1, value: "", name: "Select Country" },
        { id: 2, value: "IN", name: "IN" },
        { id: 7, value: "MV", name: "MV" },
        { id: 5, value: "CA", name: "CA" },
        { id: 3, value: "US", name: "US" },
        { id: 4, value: "UK", name: "UK" },
        { id: 6, value: "AU", name: "AU" },
    ]
    return (
        <div className='flex-1'>
            <label className="label text-sm">label</label>
            <Controller name="billingLabel" control={control} render={({ field }) => (
                <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Label"} classNames="input-sm" />
            )} />

            <label className="label text-sm">Address</label>
            <Controller name="billingAddress" control={control} render={({ field }) => (
                <TextAreaComponent field={field} regexVal={/\b\w/g} placeholder={"Enter Address"} />
            )} />

            <div className='flex gap-2 flex-col md:flex-row'>
                <div className='flex-1'>
                    <label className="label text-sm">City</label>
                    <Controller name="billingCity" control={control} render={({ field }) => (
                        <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Enter City"} classNames="input-sm" />
                    )} />
                </div>

                <div className='flex-1'>
                    <label className="label text-sm">state</label>
                    <Controller name="billingState" control={control} render={({ field }) => (
                        <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Enter state"} classNames="input-sm" />
                    )} />
                </div>
            </div>

            <div className='flex gap-2 flex-col md:flex-row'>
                <div className='flex-1'>
                    <label className="label text-sm">Country</label>
                    <Controller name="billingCountry" control={control} render={({ field }) => (
                        <SimpleSelectOption field={field} data={country} classNames="select-sm" />
                    )} />
                </div>
                <div className='flex-1'>
                    <label className="label text-sm">Postal Code</label>
                    <Controller name="billingPostalCode" control={control} render={({ field }) => (
                        <InputComponent field={field} regexVal={/\b\w/g} placeholder={"Enter City"} classNames="input-sm" />
                    )} />
                </div>


            </div>
        </div>
    )
}
