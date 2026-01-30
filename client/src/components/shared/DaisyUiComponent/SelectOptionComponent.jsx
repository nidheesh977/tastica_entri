import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { useWatch } from "react-hook-form"

export const SelectOptionComponent = React.memo(({ children, isTop, selectedTaxRate, selectPaidThrough, selectPlaceholder, selectedVendor, selectedExpenseAccount, selectedCustomer }) => {



    return (
        <div className={` dropdown ${isTop ? "dropdown-top" : "dropdown-bottom"} w-full max-w-sm mr-16 `}>
            <div tabIndex={0} role="button" className="btn justify-between bg-transparent hover:bg-transparent btn-sm w-full input-bordered ">
                <p className={` text-md text-gray-800`}>{selectedExpenseAccount ?? selectPaidThrough ?? selectedTaxRate ?? selectedVendor ?? selectedCustomer ?? selectPlaceholder}</p>
                <IoMdArrowDropdown />
            </div>
            <div
                tabIndex={-1}
                className="z-50 dropdown-content card card-sm rounded-sm bg-base-100  w-full  max-w-sm shadow-md">
                <div className="card-body bg-white p-3 ">
                    {children}
                </div>
            </div>
        </div>
    )
})
