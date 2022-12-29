import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface';
import { getMoviesUrl } from '@/config/api.config';
import axios, { axiosClassic } from 'api/interceptors';
import { IMovie } from './../shared/types/movies.types';

export const MovieService = {
    async getAll(searchTerm?: string) {
        return await axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
            params: searchTerm
            ? {
                searchTerm,
            }
            : {},
        })
    },

    async getMostPopularMovies() {
        const {data: movies} = await axiosClassic.get<IMovie[]>(
            getMoviesUrl('/most-popular')
        )

        return movies
    },

    async getById(_id: string) {
        return await axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
    },

    async update(_id: string, data: IMovieEditInput) {
        return axios.put<string>(getMoviesUrl(`/${_id}`), data)
    },

    async delete(_id: string) {
        return axios.delete<string>(getMoviesUrl(`/${_id}`))
    },

    async create() {
        return axios.delete<string>(getMoviesUrl(``))
    }
}