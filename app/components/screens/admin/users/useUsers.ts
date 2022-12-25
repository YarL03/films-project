import { useMemo, ChangeEvent, useState } from 'react';
import { toastr } from 'react-redux-toastr';
import { toastError } from '@/utils/toast-error';
import { useMutation, useQuery } from 'react-query';

import { ITableItem } from './../../../ui/admin-table/AdminTable/admin-table.interface';

import { useDebounce } from './../../../../hooks/useDebounce';

import { UserService } from '@/services/user.service';

import { getAdminUrl } from '@/config/url.config';

import { convertMongoDate } from '@/utils/date/convertMongoDate';

export const useUsers = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 500)

    // в массивчик вторым элементом идет variable для GET-запроса
    const queryData = useQuery(['users list', debouncedSearch],
    () => UserService.getAll(debouncedSearch), {
        select: ({data}) => data.map((user): ITableItem => ({
            _id: user._id,
            editUrl: getAdminUrl(`user/edit/${user._id}`),
            items: [user.email, convertMongoDate(user.createdAt)]
        })),
        
        onError: (error) => {
            toastError(error, 'Users list')
        }
    })

    const {mutateAsync: deleteAsync} = useMutation('delete user',
    (userId: string) => UserService.deleteUser(userId), {
        onError: (error) => {
            toastError(error, 'Delete user')
        },
        onSuccess: () => {
            toastr.success('Delete user', 'deleted successful')
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