
export const InputComponent = ({ field, regexVal, placeholder = "Eg." }) => {
    return (
        <>
            <input {...field}
                onChange={(e) => {
                    const updated = e.target.value.replace(regexVal, char =>
                        char.toUpperCase())
                    field.onChange(updated)
                }}
                type="text" placeholder={placeholder} className={` input input-neutral border border-gray-500 w-full`} />
        </>
    )
}
