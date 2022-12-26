import { IGenreEditInput } from "@/components/screens/admin/genre/genre-edit.interface"
import { getGenresUrl } from "@/config/api.config"
import { IGenre } from "@/shared/types/movies.types"
import axios, { axiosClassic } from "api/interceptors"



export const GenreService = {
    async getAll(searchTerm?: string) {
        return await axiosClassic.get<IGenre[]>(getGenresUrl(''), {
            params: searchTerm
            ? {
                searchTerm,
            }
            : {},
        })
    },

    async getById(_id: string) {
        return await axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`))
    },

    async delete(_id: string) {
        return axios.delete<string>(getGenresUrl(`/${_id}`))
    }, 

    async update(_id: string, data: IGenreEditInput) {
        return axios.put<string>(getGenresUrl(`/${_id}`), data)
    }
}