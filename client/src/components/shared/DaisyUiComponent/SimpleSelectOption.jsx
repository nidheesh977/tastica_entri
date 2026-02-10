import React from 'react'

export const SimpleSelectOption = ({ field, taxTypes, }) => {
    return (
        <select {...field} className="select w-full border border-gray-500">
            {taxTypes.map(tax => (
                <option disabled={tax.id === 1} key={tax.id} value={tax.value}>{tax.name}</option>
            )
            )}
        </select>
    )
}
