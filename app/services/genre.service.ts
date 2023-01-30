import { IGenreEditInput } from "@/components/screens/admin/genre/genre-edit.interface"
import { ICollection } from "@/components/screens/collections/collections.interface"
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

    async getBySlug(slug: string) {
        return await axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`))
    },

    async getCollections() {
        return await axiosClassic.get<ICollection[]>(getGenresUrl(`/collections`))
    },

    async getById(_id: string) {
        return await axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`))
    },

    async delete(_id: string) {
        return axios.delete<string>(getGenresUrl(`/${_id}`))
    }, 

    async update(_id: string, data: IGenreEditInput) {
        return axios.put<string>(getGenresUrl(`/${_id}`), data)
    },

    async create() {
        return axios.post<string>(getGenresUrl(`/`))
    }
}