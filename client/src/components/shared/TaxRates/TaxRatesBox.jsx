import { useTaxRates } from "../../../hooks/useTaxRates"
import { TaxRateTable } from "./TaxRateTable";


export const TaxRatesBox = () => {

    const { getTaxRateData, getTaxRateDataFetched, createTaxRateBook, taxRateLoaded } = useTaxRates()

    const handleCreateNewTaxRateBook = () => {
        createTaxRateBook()
    }




    return (
        <div className="px-4 xl:px-24 pt-10 pb-32">
            <div className="mx-auto mt-10 max-w-4xl flex justify-center items-center">
                {getTaxRateDataFetched ? <p>Loading...</p> : null}
                {getTaxRateData && getTaxRateDataFetched === false ? <TaxRateTable getTaxRateData={getTaxRateData} /> : null}
                {getTaxRateDataFetched === false && getTaxRateData === null ? <button onClick={handleCreateNewTaxRateBook} disabled={taxRateLoaded === true} className="btn btn-primary">{taxRateLoaded ? "Creating..." : "Create new tax book"}</button> : null}
            </div>
        </div >
    )
}
