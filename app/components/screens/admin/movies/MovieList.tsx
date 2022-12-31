import { FC } from "react"

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation"
import Heading from "@/components/ui/heading/Heading"
import AdminHeader from "@/components/ui/admin-table/AdminHeader/AdminHeader"

import Meta from "@/utils/meta/Meta"

import { useMovies } from "./useMovies"

import AdminTable from "@/components/ui/admin-table/AdminTable/AdminTable"


const MovieList: FC = () => {
    const {searchTerm, handleSearch, isLoading, data, deleteAsync, createAsync} = useMovies()

    return (
        <Meta title="Movies">
            <AdminNavigation/>
            <Heading title="Movies"/>

            <AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} onClick={createAsync}/>
            <AdminTable tableItems={data || []} isLoading={isLoading} headerItems={['Title', 'Genre', 'Raiting']} removeHandler={deleteAsync}/>
        </Meta>
    )
}

export default MovieList