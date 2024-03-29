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

    async getByGenres(genresIds: string[]) {
        return axiosClassic.post<IMovie[]>(getMoviesUrl('/by-genres'), {
            genresIds
        })
    },

    async getByActor(actorId: string) {
        return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`))
    },

    async getById(_id: string) {
        return await axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
    },

    async getBySlug(slug: string) {
        return await axiosClassic.get<IMovie>(getMoviesUrl(`/${slug}`))
    },

    async update(_id: string, data: IMovieEditInput) {
        return axios.put<string>(getMoviesUrl(`/${_id}`), data)
    },

    async delete(_id: string) {
        return axios.delete<string>(getMoviesUrl(`/${_id}`))
    },

    async create() {
        return axios.delete<string>(getMoviesUrl(``))
    },

    async updateCountOpened(slug: string) {
        return axiosClassic.put<string>(getMoviesUrl(`/update-count-opened`), {slug})
    }
}