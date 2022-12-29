import { useMemo, ChangeEvent, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import { toastError } from '@/utils/toast-error';
import { useMutation, useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { ITableItem } from '../../../ui/admin-table/AdminTable/admin-table.interface';

import { useDebounce } from '../../../../hooks/useDebounce';

import { ActorService } from '@/services/actor.service';

import { getAdminUrl } from '@/config/url.config';

import { convertMongoDate } from '@/utils/date/convertMongoDate';

export const useActors = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 500)

    const {push} = useRouter()

    // в массивчик вторым элементом идет variable для GET-запроса
    const queryData = useQuery(['actors list', debouncedSearch],
    () => ActorService.getAll(debouncedSearch), {
        select: ({data}) => data.map((actor): ITableItem => ({
            _id: actor._id,
            editUrl: getAdminUrl(`actor/edit/${actor._id}`),
            items: [actor.name, String(actor.countMovies)]
        })),
        
        onError: (error) => {
            toastError(error, 'Actors list')
        }
    })

    const {mutateAsync: deleteAsync} = useMutation('delete actor',
    (actorId: string) => ActorService.delete(actorId), {
        onError: (error) => {
            toastError(error, 'Delete actor')
        },
        onSuccess: () => {
            toastr.success('Delete actor', 'deleted successful')
            queryData.refetch()
        }
    })

    const {mutateAsync: createAsync} = useMutation('create actor',
    () => ActorService.create(), {
        onError: (error) => {
            toastError(error, 'Create actor')
        },
        onSuccess: ({data: _id}) => {
            toastr.success('Create actor', 'created successful')
            push(getAdminUrl(`actor/edit/${_id}`))
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