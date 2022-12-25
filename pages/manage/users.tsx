import UserList from "@/components/screens/admin/users/UserList"
import { NextPageAuth } from "@/shared/types/auth.types"

const Users: NextPageAuth = () => {

    return (
        <UserList/>
    )
}

// Users.isOnlyAdmin = true 

export default Users