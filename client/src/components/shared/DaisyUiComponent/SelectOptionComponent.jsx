import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

export const SelectOptionComponent = React.memo(({ children, config, isTop, selectedTaxRate, classNames, selectPaidThrough, selectPlaceholder, selectedVendor, selectedCustomer, selectedExpenseAccount, selectedCustomInvoiceCustomer }) => {
    let { setValue, deleteBtn, valueName, displayRemove, addDisplay } = config || {}
    const [isDelete, setIsDelete] = useState(false)
    const [isSelected, setIsSelected] = useState(false)


    useEffect(() => {


        const vendorSelected = selectedVendor !== undefined && selectedVendor !== "Select a vendor" && selectPlaceholder == "Select a vendor"
        const customerSelected = selectedCustomer !== undefined && selectedCustomer !== "Select a customer" && selectPlaceholder == "Select a customer"

        const newIsSelected = vendorSelected || customerSelected
        const newIsDelete = newIsSelected

        setIsSelected((prev) => (prev !== newIsSelected ? newIsSelected : prev))
        setIsDelete((prev) => (prev !== newIsDelete ? newIsDelete : prev))

    }, [selectedVendor, selectedCustomer]);



    const handleRemoveData = () => {
        setValue(valueName, "")
        setValue(displayRemove, addDisplay)
    }

    const showDeleteBtn = isDelete && isSelected && deleteBtn




    return (
        <div className={`${classNames} dropdown ${isTop ? "dropdown-top" : "dropdown-bottom"} w-full  `} >
            <div className="relative bg-white">
                <div tabIndex={0} role="button" className="btn justify-between bg-transparent hover:bg-transparent btn-sm w-full input-bordered ">
                    <p className={` text-md text-gray-800`}>{selectedExpenseAccount ?? selectPaidThrough ?? selectedTaxRate ?? selectedVendor ?? selectedCustomer ?? selectedCustomInvoiceCustomer ?? selectPlaceholder}</p>
                    <IoMdArrowDropdown />
                </div>
                {isDelete && isSelected && deleteBtn ? <div className="absolute z-50 right-8 text-red-500 top-2">
                    <span onClick={handleRemoveData} role="button"><RxCross2 />
                    </span>
                </div> : null}
            </div>

            <div
                tabIndex={-1}
                className="z-50 dropdown-content card card-sm rounded-sm bg-base-100  w-full  shadow-md">
                <div className="card-body bg-white p-3 ">
                    {children}
                </div>
            </div>
        </div >
    )
})
