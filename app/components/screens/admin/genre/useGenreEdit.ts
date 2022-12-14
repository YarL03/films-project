import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { IGenreEditInput } from "./genre-edit.interface";
import { GenreService } from '@/services/genre.service';
import { toastError } from '@/utils/toast-error';
import { getKeys } from '@/utils/getKeys';
import { toastr } from 'react-redux-toastr';
import { getAdminUrl } from '@/config/url.config';

export const useGenreEdit = (setValue:UseFormSetValue<IGenreEditInput>) => {
    const {push, query} = useRouter()

    const genreId = String(query.id)

    const {isLoading} = useQuery(['genre', genreId], () => GenreService.getById(genreId), {
        onSuccess({data}) {
            getKeys(data).forEach(key => {
                setValue(key, data[key])
            })
        },
        onError(error) {
            toastError(error, 'Get genre')
        },
        enabled: !!query.id
    })

    const {mutateAsync} = useMutation('update genre', (data: IGenreEditInput) => GenreService.update(genreId, data), {
        onSuccess() {
            toastr.success('Update genre', 'updated successful')
            push(getAdminUrl('genres'))
        },
        onError(error) {
            toastError(error, 'Update genre')
        },
    })

    const onSubmit:SubmitHandler<IGenreEditInput> = async (data) => {
        await mutateAsync(data)
    }

    return {onSubmit, isLoading}
}