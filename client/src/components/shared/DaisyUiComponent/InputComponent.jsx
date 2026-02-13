
export const InputComponent = ({ field, regexVal, placeholder = "Eg.", lowerCase = false }) => {
    return (
        <>
            <input {...field}
                onChange={(e) => {
                    const updated = e.target.value.replace(regexVal, char =>
                        lowerCase ? char.toLowerCase() : char.toUpperCase())
                    field.onChange(updated)
                }}
                type="text" placeholder={placeholder} className={` input input-neutral border border-gray-500 w-full`} />
        </>
    )
}
