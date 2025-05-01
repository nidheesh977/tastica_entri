import React from 'react'
import { SideBar } from '../../../components/shared/SideBar/SideBar'
import { Cart } from '../../shared/Cart/Cart'
import { StaffHeader } from '../../../components/staff/StaffHeader/StaffHeader'

export const StaffHome = () => {
  return (
    <div>
        <StaffHeader/>
        <SideBar/>
        <Cart/>
    </div>
  )
}
