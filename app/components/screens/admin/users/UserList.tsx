import { FC } from "react"

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation"
import Heading from "@/components/ui/heading/Heading"
import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader"

import Meta from "@/utils/meta/Meta"

import { useUsers } from "./useUsers"

import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable"


const UserList: FC = () => {
    const {searchTerm, handleSearch, isLoading, data, deleteAsync} = useUsers()

    return (
        <Meta title="Users">
            <AdminNavigation/>
            <Heading title="Users"/>

            <AdminHeader searchTerm={searchTerm} handleSearch={handleSearch}/>
            <AdminTable tableItems={data || []} isLoading={isLoading} headerItems={['Email', 'Date register']} removeHandler={deleteAsync}/>
        </Meta>
    )
}

export default UserList