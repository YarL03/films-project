import { IUser } from './../shared/types/user.types';
import axios from 'api/interceptors'
import { getUsersUrl } from '@/config/api.config';
import { IProfileInput } from '@/components/screens/profile/profile.interface';
import { IMovie } from '@/shared/types/movies.types';

export const UserService = {
    async getAll(searchTerm?: string) {
        return axios.get<IUser[]>(getUsersUrl(''), {
            params: searchTerm
                ? {
                    searchTerm
                }
                : {}
        })
    },

    async getProfile() {
        return axios.get<IUser>(getUsersUrl('/profile'))
    },

    async getFavorites() {
        return axios.get<IMovie[]>(getUsersUrl('/profile/favorites'))
    },

    async getById(_id: string) {
        return axios.get<IUser>(getUsersUrl(`/${_id}`))
    },

    async update(_id: string, data: IProfileInput) {
        return axios.put<string>(getUsersUrl(`/${_id}`), data)
    },

    async updateProfile(data: IProfileInput) {
        return axios.put<string>(getUsersUrl('/profile'), data)
    },

    async toggleFavorite(moveId: string) {
        return axios.put<string>(getUsersUrl('/profile/favorites'), {
            moveId
        })
    },

    async deleteUser(_id: string) {
        return axios.delete<string>(getUsersUrl(`/${_id}`))
    }
}