import React from 'react'
import { Cart } from '../../shared/Cart/Cart'
import { StaffSideBar } from '../../../components/staff/StaffSideBar/StaffSideBar'


export const StaffHome = () => {
  return (
    <div>
        
       <StaffSideBar/>
        <Cart />
    </div>
  )
}
