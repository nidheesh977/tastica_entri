

export const SimpleSelectOption = ({ field, data, classNames }) => {

    return (
        <select {...field} className={`select ${classNames ? classNames : "select-md "}  w-full max-w-full border appearance-none border-gray-500`}>
            {data.map((item, index) => {

                return (
                    <option disabled={item.id === 1} key={item.id} value={item.value}>{item.name}</option>
                )
            }
            )}

        </select>
    )
}
