import React from 'react'

export const TableComponent = ({ children }) => {
    return (
        <div className="overflow-x-auto ">
            <table className="table">
                {children}
            </table>
        </div>

    )
}
