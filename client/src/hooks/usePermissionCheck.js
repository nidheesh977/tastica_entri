
import { useSelector } from 'react-redux'

export const usePermissionCheck = () => {

    const permissions = useSelector((state) => state.auth?.permissions || [])

    const hasPermission = (permission) => {

        const permissionToLowerCase = permission.toLowerCase() || ""

        const permissionChecked = permissions.includes(permissionToLowerCase)

        return permissionChecked
    }
    return { hasPermission }
}
