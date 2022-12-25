import { useMemo, ChangeEvent, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import { toastError } from '@/utils/toast-error';
import { useMutation, useQuery } from 'react-query';

import { ITableItem } from '../../../ui/admin-table/AdminTable/admin-table.interface';

import { useDebounce } from '../../../../hooks/useDebounce';

import { GenreService } from '@/services/genre.service';

import { getAdminUrl } from '@/config/url.config';

import { convertMongoDate } from '@/utils/date/convertMongoDate';

export const useGenres = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 500)

    // в массивчик вторым элементом идет variable для GET-запроса
    const queryData = useQuery(['genres list', debouncedSearch],
    () => GenreService.getAll(debouncedSearch), {
        select: ({data}) => data.map((genre): ITableItem => ({
            _id: genre._id,
            editUrl: getAdminUrl(`genre/edit/${genre._id}`),
            items: [genre.name, convertMongoDate(genre.slug)]
        })),
        
        onError: (error) => {
            toastError(error, 'Genres list')
        }
    })

    const {mutateAsync: deleteAsync} = useMutation('delete genre',
    (genreId: string) => GenreService.deleteGenre(genreId), {
        onError: (error) => {
            toastError(error, 'Delete genre')
        },
        onSuccess: () => {
            toastr.success('Delete genre', 'deleted successful')
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