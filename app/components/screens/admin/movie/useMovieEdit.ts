import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { IMovieEditInput } from "./movie-edit.interface";
import { MovieService } from '@/services/movie.service';
import { toastError } from '@/utils/toast-error';
import { getKeys } from '@/utils/getKeys';
import { toastr } from 'react-redux-toastr';
import { getAdminUrl } from '@/config/url.config';

export const useMovieEdit = (setValue:UseFormSetValue<IMovieEditInput>) => {
    const {push, query} = useRouter()

    const movieId = String(query.id)

    const {isLoading} = useQuery(['movie', movieId], () => MovieService.getById(movieId), {
        onSuccess({data}) {
            getKeys(data).forEach(key => {
                setValue(key, data[key])
            })
        },
        onError(error) {
            toastError(error, 'Get movie')
        },
        enabled: !!query.id
    })

    const {mutateAsync} = useMutation('update movie', (data: IMovieEditInput) => MovieService.update(movieId, data), {
        onSuccess() {
            toastr.success('Update movie', 'updated successful')
            push(getAdminUrl('movies'))
        },
        onError(error) {
            toastError(error, 'Update movie')
        },
    })

    const onSubmit:SubmitHandler<IMovieEditInput> = async (data) => {
        await mutateAsync(data)
    }

    return {onSubmit, isLoading}
}