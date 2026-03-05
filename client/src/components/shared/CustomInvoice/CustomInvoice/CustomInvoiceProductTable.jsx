import React, { useEffect, useState } from 'react'
import { TextAreaComponent } from '../../DaisyUiComponent/TextAreaComponent'
import { Controller } from 'react-hook-form'
import { InputComponent } from '../../DaisyUiComponent/InputComponent'
import { IoMdArrowDropdown } from 'react-icons/io'
import { useTaxRates } from '../../../../hooks/useTaxRates'
import { filterDataArr } from '../../../../utils/filterDataArr'
import { IoMdClose } from "react-icons/io";
import { addRow, setRows, addDescription, updateTax, updateNonTax, removeRow, addShippingCharge, addAdjustmentAmount, addActiveRowIndex, addQuantity, addDiscount, addDiscountType } from "../../../../redux/features/customInvoiceProductTable"
import { useDispatch, useSelector } from 'react-redux'
import { addBackgroundBlur, setOpenCustomProductAddForm } from '../../../../redux/features/commonSlice'
import { useRef } from 'react'
import toast from 'react-hot-toast'


export const CustomInvoiceProductTable = ({ control, watch, setValue }) => {

    const [productListCard, setProductListCard] = useState(false)
    const [selectDiscountType, setSelectDiscountType] = useState(null);
    const { taxRatesDataForCustomInvoiceForm } = useTaxRates()

    const ref = useRef()
    const { rows, subTotal, grandTotal, adjustment, shipping, roundOff, taxes } = useSelector((state) => state.customInvoiceProductTable)

    console.log(shipping);


    const dispatch = useDispatch()

    const productTable = [
        { id: 5, productName: "chicken masala", rate: 135 },
        { id: 6, productName: "meat masala", rate: 45 },
        { id: 7, productName: "fish masala", rate: 35 },
    ]

    // tax calculation for product total box
    const mergedTaxes = Object.values(
        rows.reduce((acc, curr) => {
            if (!curr.tax) return acc;

            const taxableAmount =
                curr.amount || (curr.quantity * curr.rate);

            const taxAmount =
                (taxableAmount * curr.taxRate) / 100;

            if (!acc[curr.tax]) {
                acc[curr.tax] = {
                    taxCodeName: curr.tax,
                    rate: 0,
                    taxableAmount: 0,
                    totalTaxAmount: 0
                };
            }


            acc[curr.tax].rate = curr.taxRate;

            acc[curr.tax].taxableAmount += taxableAmount;
            acc[curr.tax].totalTaxAmount += taxAmount;

            return acc;
        }, {})
    );

    console.log(mergedTaxes);

    // ------------------------------------------------------------------
    // array product totals

    const calculateSubTotal = rows.reduce(
        (acc, row) => acc + row.amount,
        0
    );

    const totalTax = mergedTaxes.reduce(
        (acc, row) => acc + row.totalTaxAmount, 0
    )

    const total = (calculateSubTotal + totalTax).toFixed(2)

    const roundedTotal = Math.ceil(total);

    const roundOffDifference = Number(Math.abs(roundedTotal - total).toFixed(2));

    // ------------------------------------------------------------------

    const handleAddNewRow = () => {
        const newRow = {
            id: Date.now(),
            item: "",
            description: "",
            quantity: 0,
            rate: 0.00,
            discount: 0.00,
            taxId: null,
            tax: 0,
            isNew: true,
            amount: 0,
            baseAmount: 0,
            discountType: "percentage"
        }
        dispatch(addRow(newRow))
    }

    const handleOpenProductDesc = (desc, index) => {
        setProductListCard(false);

        dispatch(addDescription({ description: desc, index }))

    }

    // add product to table and tax 

    const handleSelectProduct = (selectProduct) => {
        setProductListCard(false)
        dispatch(setRows({ selectProduct }))
        setValue("productName", "");
    }

    const handleProductQty = (quantity, index) => {

        if (isNaN(quantity)) {
            return toast.error("Enter valid quanity")

        } else {
            dispatch(addQuantity({ quantity, index }));
        }

    }

    const handleProductDiscount = (discountAmt, index) => {


        if (isNaN(discountAmt) || discountAmt < 0) {
            toast.error("Enter valid amount")
            return
        }

        if (rows[index].discountTypeValid === "percentage" && discountAmt > 100) {
            toast.error("Percentage cannot exceed 100")
            return
        }


        if (rows[index].discountTypeValid === "flat" && discountAmt > rows[index].baseAmount) {
            toast.error("Discount cannot exceed item amount")
            return
        }

        dispatch(addDiscount({ discountAmt, index }))

    }

    const handleDiscountType = (discountType, index) => {
        if (discountType === "flat") {
            dispatch(addDiscountType({ discountType, index }))
            setSelectDiscountType("flat")
        }

        if (discountType === "percentage") {
            dispatch(addDiscountType({ discountType, index }))
            setSelectDiscountType("percentage")
        }

    }

    const handleShippingCharge = (charge) => {

        const shippingCharge = Number(charge)

        dispatch(addShippingCharge({ shippingCharge }))
    }
    const handleAdjustmentAmount = (adjustmentAmt) => {

        const adjustmentAmount = Number(adjustmentAmt)
        if (isNaN(addAdjustmentAmount)) {
            toast.error("Enter valid amount")
            return
        } else {
            dispatch(addAdjustmentAmount({ adjustmentAmount }))
        }
    }

    const handleAddNonTax = (index) => dispatch(updateNonTax({ index }))


    const handleSelectTax = (taxName, taxRate, index, taxId) => dispatch(updateTax({ index, taxName, taxRate, taxId }))


    const handleRemoveItem = (productId) => dispatch(removeRow({ productId }))


    const handleOpenCustomProductCard = () => {
        dispatch(setOpenCustomProductAddForm(true))
        dispatch(addBackgroundBlur(true))
    }

    const handleOpenProductBox = (index) => {
        dispatch(addActiveRowIndex(index));
        setProductListCard(true)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setProductListCard(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])



    const productCard = (
        <div ref={ref} className="card w-96  lg:w-[600px] bg-base-100 card-sm shadow-md absolute">
            <div className="card-body p-0">
                {productTable.map((product) => (
                    <div onClick={() => handleSelectProduct(product)} key={product.id} className='hover:bg-blue-500 hover:text-white px-4 py-1 rounded-md'>
                        <p className='text-sm'>{product.productName}</p>
                        <p className='text-xs mt-2'>Rate: {product.rate}</p>
                    </div>
                ))}
                <p onClick={handleOpenCustomProductCard} className='my-2 pl-2 text-sm text-blue-500'>Add new Product</p>
            </div>
        </div>
    )



    return (
        <>

            <div className='bg-gray-200  p-2 w-full'>
                <p className='font-medium'>Item Table</p>
            </div>
            <div className="w-full overflow-x-visible">
                {/* Desktop Header */}
                <div className="hidden md:grid grid-cols-6 font-semibold border-b min-w-[900px] py-2">
                    <p>ITEM DETAILS</p>
                    <p>QUANTITY</p>
                    <p>RATE</p>
                    <p>DISCOUNT</p>
                    <p>TAX</p>
                    <p>AMOUNT</p>
                </div>

                {/* Items */}
                {rows.map((item, index) => (
                    <div
                        key={index}
                        className="border-b py-3 md:py-0 md:grid md:grid-cols-6 md:min-w-[900px] md:items-center md:border"
                    >
                        {/* Mobile Card Layout */}
                        <div className="md:hidden space-y-1">
                            <div><span className="font-semibold">Item:</span>
                                <div>
                                    {item.itemName ? item.itemName : <span onFocus={() => handleOpenProductBox(index)}>
                                        <Controller name="productName" control={control} render={({ field }) => (
                                            <InputComponent classNames={"input-sm"} isValueExist={item.itemName} field={field} regexVal={/\b\w/g} placeholder={"Add new item"} />
                                        )} />
                                    </span>}
                                    {item.itemName ? <span onFocus={() => handleOpenProductDesc()}>
                                        <Controller name="address" control={control} render={({ field }) => (
                                            <TextAreaComponent classNames={"h-2"} field={field} regexVal={/\b\w/g} placeholder={"Enter description"} />
                                        )} />
                                    </span> : null}
                                </div>
                            </div>
                            <p><span className="font-semibold">Qty:</span> 0</p>
                            <p><span className="font-semibold">Rate:</span> ₹{item.rate}</p>
                            <p><span className="font-semibold">Discount:</span> {item.discount}%</p>
                            <p><span className="font-semibold">Tax:</span> {item.tax}%</p>
                            <p><span className="font-semibold">Amount:</span> ₹{item.amount}</p>
                        </div>

                        {/* Desktop Grid Layout */}
                        <div className="hidden md:block md:p-2 md:h-full">
                            <div>
                                {item.itemName ? item.itemName : <span onFocus={() => handleOpenProductBox(index)}>
                                    <Controller name="productName" control={control} render={({ field }) => (
                                        <InputComponent classNames={"input-sm"} field={field} regexVal={/\b\w/g} placeholder={"Add new item"} />
                                    )} />
                                </span>}
                                {item.itemName ? <span onChange={(e) => handleOpenProductDesc(e.target.value, index)}>
                                    <textarea className="textarea h-1 w-full textarea-neutral border border-gray-500" placeholder="Bio"></textarea>
                                </span> : null}
                            </div>

                        </div>

                        <div className="hidden md:flex md:items-center md:justify-center md:p-2 md:h-full md:border-x">
                            <input type="text" onChange={(e) => handleProductQty(e.target.value, index)} value={item.quantity} placeholder="quantity" className="input w-full input-sm input-neutral border border-gray-500" />
                        </div>


                        <div className="hidden md:flex md:items-center md:justify-center md:p-2 md:h-full md:border-x">₹{item.rate}</div>
                        <div className="hidden md:flex md:flex-col md:items-center md:justify-center md:p-2 md:h-full md:border-x">
                            <div className='h-full flex justify-between w-full'>
                                <p>
                                    <input type="radio" name={`discount-${index}`}
                                        onChange={(e) => handleDiscountType(e.target.value, index)}
                                        value={"flat"}
                                        checked={item.discountType === "flat"}
                                        className="radio radio-primary radio-xs mr-1" />
                                    <label htmlFor="taxInclusive" >Flat</label>
                                </p>
                                <p>
                                    <label htmlFor="taxInclusive" >%</label>
                                    <input type="radio"
                                        onChange={(e) => handleDiscountType(e.target.value, index)}
                                        max={item.discountType === "percentage" ? 100 : undefined}
                                        value={"percentage"}
                                        name={`discount-${index}`}
                                        checked={item.discountType === "percentage"}
                                        className="radio radio-primary radio-xs ml-1" />
                                </p>
                            </div>
                            <div className='flex w-full justify-center '>
                                <div className='w-fit relative'>
                                    {item.discountValue ? <span className='absolute right-5 top-2 text-xs text-gray-500'>{item.baseAmount} {item.discountType === "percentage" ? "%" : "-"} {item.discountValue} = {item.discountAmount}</span> : null}
                                    <input type="text" onChange={(e) => handleProductDiscount(e.target.value, index)} value={item.discountValue} className="input w-full input-sm input-neutral border border-gray-500" />
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex md:items-center md:justify-center md:p-2 md:h-full md:border-x">
                            <div className={` dropdown w-full`} >
                                <div className="relative bg-white">
                                    <div tabIndex={0} role="button" className="btn justify-between bg-transparent hover:bg-transparent btn-sm w-full input-bordered ">
                                        <p className={` text-md text-gray-800`}>{item.tax ? item.tax : "Select Tax"}</p>
                                        <IoMdArrowDropdown />
                                    </div>
                                    <div
                                        tabIndex={-1}
                                        className="z-50 absolute dropdown-content card card-sm rounded-sm bg-base-100  w-full  shadow-md">
                                        <div className="card-body bg-white p-3  z-[1000]">
                                            <button type="button" onClick={() => handleAddNonTax(index)} className="w-full text-start rounded-md px-2 py-1  hover:bg-blue-500 hover:text-white block text-sm text-gray-700"> Non-Taxable </button>
                                            {taxRatesDataForCustomInvoiceForm?.taxRates?.map((taxRate) => (
                                                <button type="button" onClick={() => {
                                                    handleSelectTax(taxRate.taxCodeName, taxRate.rate, index, taxRate._id)
                                                }}
                                                    key={taxRate._id} className="w-full text-start rounded-md px-2 py-1 my-2 hover:bg-blue-500 hover:text-white block text-sm text-gray-700">{taxRate.taxCodeName} [{taxRate.rate}%] </button>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="hidden md:flex md:items-center  md:p-2 md:h-full  md:border-x font-semibold justify-between">
                            <div className='flex flex-1 justify-center'>
                                {item.amount}
                            </div>
                            <div className='h-full flex justify-end items-start flex-1'>
                                <IoMdClose color='red' onClick={() => handleRemoveItem(item.id)} />
                            </div>
                        </div>
                    </div>

                ))}
            </div >
            <div className='w-full flex justify-between'>
                {productListCard ? productCard : null}
                <div className='w-1/2 flex justify-between flex-col items-start pr-10'>
                    <button onClick={handleAddNewRow} className='mt-5 btn btn-sm btn-primary'>Add new row</button>
                    <div className='w-full'>
                        <label className="label mt-2">Customer Notes</label>
                        <Controller name="address" control={control} render={({ field }) => (
                            <TextAreaComponent classNames={""} field={field} regexVal={/\b\w/g} placeholder={"Enter description"} />
                        )} />
                    </div>
                </div>
                <div className='w-96 '>
                    <div className='mt-5 bg-slate-100 p-2 rounded-md'>

                        <div className='flex justify-between'>
                            <p className='text-sm font-medium'>Sub total</p>
                            <p className='text-xs font-medium'>{subTotal.toFixed(2)}</p>
                        </div>
                        <div className='flex justify-between items-center mt-5'>
                            <div className='flex items-center gap-5'>
                                <p className='text-xs font-normal'>Shipping charges</p>
                                <input type="text" onChange={(e) => handleShippingCharge(e.target.value)} placeholder="Shipping Charge" className="input w-full input-sm input-neutral border border-gray-500" />
                            </div>
                            <p className='text-xs font-medium'>{(shipping).toFixed(2)}</p>
                        </div>

                        <hr className='my-2' />

                        <div className=''>
                            {taxes.map((tax) => (
                                <div className='flex justify-between gap-1 mt-1 text-sm font-medium'>
                                    <p>{tax.taxCodeName}</p>
                                    <p >{tax.totalTaxAmount.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className='flex justify-between items-center mt-5'>
                            <div className='flex items-center gap-10'>
                                <p className='text-xs font-normal mr-2'> Adjustment</p>
                                <input type="text" onChange={(e) => handleAdjustmentAmount(e.target.value)} placeholder="Shipping Charge" className="input w-full input-sm input-neutral border border-gray-500" />
                            </div>
                            <p className='text-xs font-medium'>{(adjustment).toFixed(2)}</p>
                        </div>


                        <div className='flex justify-between mt-5'>
                            <p className='text-xs font-medium'>Round Off</p>
                            <p className='text-xs font-medium'>{(roundOff).toFixed(2)}</p>
                        </div>

                        <hr className='my-5' />

                        <div className='flex justify-between mt-5'>
                            <p className='text-sm font-medium'>Total</p>
                            <p className='text-sm font-medium'>{(grandTotal).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}




