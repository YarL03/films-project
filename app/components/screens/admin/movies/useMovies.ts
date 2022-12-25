import { useMemo, ChangeEvent, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import { toastError } from '@/utils/toast-error';
import { useMutation, useQuery } from 'react-query';

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface';

import { useDebounce } from '@/hooks/useDebounce';

import { MovieService } from '@/services/movie.service';

import { getAdminUrl } from '@/config/url.config';

import { getGenresList } from '@/utils/movie/getGenresList';

export const useMovies = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 500)

    // в массивчик вторым элементом идет variable для GET-запроса
    const queryData = useQuery(['movies list', debouncedSearch],
    () => MovieService.getAll(debouncedSearch), {
        select: ({data}) => data.map((movie): ITableItem => ({
            _id: movie._id,
            editUrl: getAdminUrl(`movie/edit/${movie._id}`),
            items: [movie.title, getGenresList(movie.genres), String(movie.rating)]
        })),
        
        onError: (error) => {
            toastError(error, 'movies list')
        }
    })

    const {mutateAsync: deleteAsync} = useMutation('delete movie',
    (movieId: string) => MovieService.deleteMovie(movieId), {
        onError: (error) => {
            toastError(error, 'Delete movie')
        },
        onSuccess: () => {
            toastr.success('Delete movie', 'deleted successful')
            queryData.refetch()
        }
    })
    
    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return useMemo(() => ({
        handleSearch,
        searchTerm,
        deleteAsync,
        ...queryData
    }), [queryData, searchTerm, deleteAsync])
}