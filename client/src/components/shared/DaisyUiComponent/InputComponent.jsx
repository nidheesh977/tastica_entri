
export const InputComponent = ({ field }) => {
    return (
        <>
            <input {...field}
                onChange={(e) => {
                    const updated = e.target.value.replace(/\b\w/g, char =>
                        char.toUpperCase())
                    field.onChange(updated)
                }}
                type="text" placeholder="neutral" className="input input-neutral border border-gray-500 w-full" />
        </>
    )
}
