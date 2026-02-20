import { useState } from "react"
import { TaxRateForm } from "./TaxRateForm"
import { ModelPopUp } from "../DaisyUiComponent/ModelPopUp"
import { useTaxRates } from "../../../hooks/useTaxRates"
import { useDispatch, useSelector } from "react-redux"
import { addBackgroundBlur, setOpenTaxRateForm } from "../../../redux/features/commonSlice"
import { TableComponent } from "../DaisyUiComponent/TableComponent"
import { TaxRateStatusForm } from "./TaxRateStatusForm"

export const TaxRateTable = ({ getTaxRateData }) => {

    const [openTaxCreateForm, setOpenTaxCreateForm] = useState(false)
    const [modelBox, setModelBox] = useState(false)
    const [taxData, setTaxData] = useState({
        taxAccountId: null,
        taxRateId: null,
        taxName: null,
        taxRate: null
    })

    const [openStatusForm, setOpenStatusForm] = useState({
        openCom: false,
        taxRateId: null,
        isActive: null,
        taxAccountId: null
    })


    const { openTaxRateForm } = useSelector(state => state.common)

    const dispatch = useDispatch()
    const { deleteTaxFromAccount, deleteTaxAccountLoaded } = useTaxRates()


    const handleOpenForm = () => {
        dispatch(setOpenTaxRateForm(true))
        dispatch(addBackgroundBlur(true))
    }

    const handleOpenDelete = (accountId, taxId, taxName, taxRate) => {
        setTaxData((prev) => ({ ...prev, taxAccountId: accountId, taxRateId: taxId, taxName: taxName, taxRate: taxRate }))
        setModelBox(true)
        dispatch(addBackgroundBlur(true))
    }

    const deleteTaxRate = () => {
        const { taxAccountId, taxRateId } = taxData
        deleteTaxFromAccount({ taxAccountId, taxRateId })
    }

    const taxModelTitle = (<p>Delete
        <span className='ml-2 text-sm bg-gray-200 px-2 py-1 rounded-md' > {taxData?.taxRate}% {taxData?.taxName}</span>
    </p>)

    const alertMessage = "Are you sure you want to delete this item? This action cannot be undone."

    const modelDataObj = {
        title: taxModelTitle,
        message: alertMessage,
        btnName: "Delete",
        loadingBtnName: "Deleting",
        isLoading: deleteTaxAccountLoaded,
        click: deleteTaxRate,
        closeModel: setModelBox
    }


    const handleChangeAccStatus = (num, taxRateId, active, taxAccountId) => {

        dispatch(addBackgroundBlur(true))
        setOpenStatusForm(prev => ({
            openCom: true,
            taxRateId: taxRateId,
            isActive: active,
            taxAccountId: taxAccountId
        }))

    }



    console.log(openStatusForm)

    return (
        <div className="w-full relative">
            {modelBox ? <ModelPopUp modelDataObj={modelDataObj} /> : null}
            <div className="flex justify-end items-center">
                {openTaxRateForm ? <TaxRateForm /> : null}
                {openStatusForm.openCom ? <TaxRateStatusForm openStatusForm={openStatusForm} setOpenStatusForm={setOpenStatusForm} /> : null}
                {<button onClick={handleOpenForm} className="btn btn-success btn-sm text-white">Add</button>}
            </div>
            <TableComponent>
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Tax code name</th>
                        <th>Tax Rates</th>
                        <th>Tax Types</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {getTaxRateData?.taxRates.map((tax, index) => (
                        <tr key={tax?._id}>
                            <th>{index + 1}</th>
                            <td >{tax?.taxCodeName}</td>
                            <td>{tax?.rate}%</td>
                            <td>{tax?.taxType}</td>
                            <td>{tax?.inActiveReason === null ? "N/A" : tax?.inActiveReason.slice(0, 12)} {tax?.inActiveReason === null ? null : tax?.inActiveReason.length > 12 ? "..." : null} </td>
                            <td>
                                {<button className={`btn btn-xs w-20 ${tax?.isActive ? "btn-success" : "btn-error"}  `} onClick={() => handleChangeAccStatus(index, tax?._id, tax?.isActive ? false : true, getTaxRateData?._id)}>

                                    {tax?.isActive === true ? "Active" : "In Active"}

                                </button>}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </TableComponent>

        </div >
    )
}
