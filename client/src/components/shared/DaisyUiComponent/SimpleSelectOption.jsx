

export const SimpleSelectOption = ({ field, data, }) => {

    return (
        <select {...field} className="select w-full border border-gray-500">
            {data.map((tax, index) => {

                return (
                    <option disabled={tax.id === 1} key={tax.id} value={tax.value}>{tax.name}</option>
                )
            }
            )}

        </select>
    )
}
