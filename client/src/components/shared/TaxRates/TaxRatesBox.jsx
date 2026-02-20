import { useTaxRates } from "../../../hooks/useTaxRates"
import { TaxRateTable } from "./TaxRateTable";


export const TaxRatesBox = () => {

    const { getTaxRateData, getTaxRateDataLoading, createTaxRateBook, taxRateLoaded, getTaxDataRefreshing } = useTaxRates()

    const handleCreateNewTaxRateBook = () => {
        createTaxRateBook()
    }




    return (
        <div className="px-4 xl:px-24 pt-10 pb-32">
            <div className="mx-auto mt-10 max-w-4xl flex justify-center flex-col items-center">
                {getTaxRateDataLoading ? <p className='text-center w-full'>Loading...</p> : null}
                {getTaxRateData && getTaxRateDataLoading === false ? <TaxRateTable getTaxRateData={getTaxRateData} /> : null}
                {!getTaxRateDataLoading && getTaxRateData?.length === 0 ? <p>No data found</p> : null}
                {getTaxDataRefreshing && !getTaxRateDataLoading ? <p className='text-xs text-gray-400'>Refreshing...</p> : null}
                {getTaxRateDataLoading === false && getTaxRateData === null ? <button onClick={handleCreateNewTaxRateBook} disabled={taxRateLoaded === true} className="btn btn-primary">{taxRateLoaded ? "Creating..." : "Create new tax book"}</button> : null}

            </div>
        </div >
    )
}
