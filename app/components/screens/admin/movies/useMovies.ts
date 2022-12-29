import { useMemo, ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
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

    const {push} = useRouter()

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
    (movieId: string) => MovieService.delete(movieId), {
        onError: (error) => {
            toastError(error, 'Delete movie')
        },
        onSuccess: () => {
            toastr.success('Delete movie', 'deleted successful')
            queryData.refetch()
        }
    })

    const {mutateAsync: createAsync} = useMutation('create movie',
    () => MovieService.create(), {
        onError: (error) => {
            toastError(error, 'Create movie')
        },
        onSuccess: ({data: _id}) => {
            toastr.success('Create movie', 'created successful')
            push(getAdminUrl(`movie/edit/${_id}`))
        }
    })
    
    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return useMemo(() => ({
        handleSearch,
        searchTerm,
        deleteAsync,
        createAsync,
        ...queryData
    }), [queryData, searchTerm, deleteAsync, createAsync])
}