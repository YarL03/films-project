import { IActorEditInput } from "@/components/screens/admin/actor/actor-edit.interface"
import { getActorsUrl } from "@/config/api.config"
import { IActor } from "@/shared/types/movies.types"
import axios, { axiosClassic } from "api/interceptors"



export const ActorService = {
    async getAll(searchTerm?: string) {
        return await axiosClassic.get<IActor[]>(getActorsUrl(''), {
            params: searchTerm
            ? {
                searchTerm,
            }
            : {},
        })
    },

    async getBySlug(slug: string) {
        return await axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`))
    },

    async getById(_id: string) {
        return await axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
    },

    async delete(_id: string) {
        return axios.delete<string>(getActorsUrl(`/${_id}`))
    },

    async update(_id: string, data: IActorEditInput) {
        return axios.put<string>(getActorsUrl(`/${_id}`), data)
    },

    async create() {
        return axios.delete<string>(getActorsUrl(''))
    }
}