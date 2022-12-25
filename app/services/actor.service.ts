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

    async deleteActor(_id: string) {
        return axios.delete<string>(getActorsUrl(`/${_id}`))
    }
}