import { FC } from "react"

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation"
import Heading from "@/components/ui/heading/Heading"
import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader"

import Meta from "@/utils/meta/Meta"

import { useGenres } from "./useGenres"

import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable"


const GenreList: FC = () => {
    const {searchTerm, handleSearch, isLoading, data, deleteAsync, createAsync} = useGenres()

    return (
        <Meta title="Genres">
            <AdminNavigation/>
            <Heading title="Genres"/>

            <AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} onClick={createAsync}/>
            <AdminTable tableItems={data || []} isLoading={isLoading} headerItems={['Name', 'Slug']} removeHandler={deleteAsync}/>
        </Meta>
    )
}

export default GenreList