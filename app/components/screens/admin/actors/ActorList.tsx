import { FC } from "react"

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation"
import Heading from "@/components/ui/heading/Heading"
import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader"

import Meta from "@/utils/meta/Meta"

import { useActors } from "./useActors"

import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable"


const ActorList: FC = () => {
    const {searchTerm, handleSearch, isLoading, data, deleteAsync, createAsync} = useActors()

    return (
        <Meta title="Actors">
            <AdminNavigation/>
            <Heading title="Actors"/>

            <AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} onClick={createAsync}/>
            <AdminTable tableItems={data || []} isLoading={isLoading} headerItems={['Name', 'Count movies']} removeHandler={deleteAsync}/>
        </Meta>
    )
}

export default ActorList