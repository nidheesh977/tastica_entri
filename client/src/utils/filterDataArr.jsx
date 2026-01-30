import React, { useEffect, useState } from 'react'

export const filterDataArr = (data, filterValue, arr, key, isSingleArr) => {
    const [filteredData, setFilteredData] = useState([])


    useEffect(() => {
        if (isSingleArr === false) {
            if (!filterValue || filterValue.toString().trim() === "") {
                setFilteredData(data)
                return
            } else {
                const filterData = data.filter((data) => {
                    return data[arr].some(item => item[key].toLowerCase().includes(filterValue.toString().toLowerCase()))
                })

                setFilteredData(filterData)
            }
        }

        if (isSingleArr === true) {
            if (!filterValue || filterValue.toString().trim() === "") {
                setFilteredData(data)
                return
            } else {
                const filterData = data.filter((data) => {
                    return data[key].toLowerCase().includes(filterValue.toString().toLowerCase())
                })
                setFilteredData(filterData)

            }
        }

    }, [filterValue, data])
    return filteredData
}
