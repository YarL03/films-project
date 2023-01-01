import { useQuery, useMutation } from 'react-query';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { toastr } from 'react-redux-toastr';

import { IProfileInput } from './profile.interface';

import { UserService } from '@/services/user.service';

import { toastError } from '@/utils/toast-error';

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {

    const {isLoading} = useQuery('profile', () => UserService.getProfile(), {
        onSuccess({data}) {
            setValue('email', data.email)
        },
        onError(error) {
            toastError(error, 'Get profile')
        }
    })

    const {mutateAsync} = useMutation('update profile', (data: IProfileInput) => UserService.updateProfile(data), {
        onSuccess() {
            toastr.success('Update profile', 'updated successful')
        },
        onError(error) {
            toastError(error, 'Update movie')
        },
    })

    const onSubmit:SubmitHandler<IProfileInput> = async (data) => {
        await mutateAsync(data)
    }

    return {onSubmit, isLoading}
}