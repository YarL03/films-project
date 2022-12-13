import { getMoviesUrl } from '@/config/api.config';
import { axiosClassic } from 'api/interceptors';
import { IMovie } from './../shared/types/movies.types';

export const MovieService = {
    async getAllMovies(searchTerm?: string) {
        return await axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
            params: searchTerm
            ? {
                searchTerm,
            }
            : {},
        })
    }
}