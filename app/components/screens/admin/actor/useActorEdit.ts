import { useQuery, useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { IActorEditInput } from "./actor-edit.interface";
import { ActorService } from '@/services/actor.service';
import { toastError } from '@/utils/toast-error';
import { getKeys } from '@/utils/getKeys';
import { toastr } from 'react-redux-toastr';
import { getAdminUrl } from '@/config/url.config';

export const useActorEdit = (setValue:UseFormSetValue<IActorEditInput>) => {
    const {push, query} = useRouter()

    const actorId = String(query.id)

    const {isLoading} = useQuery(['actor', actorId], () => ActorService.getById(actorId), {
        onSuccess({data}) {
            getKeys(data).forEach(key => {
                setValue(key, data[key])
            })
        },
        onError(error) {
            toastError(error, 'Get actor')
        },
        enabled: !!query.id
    })

    const {mutateAsync} = useMutation('update actor', (data: IActorEditInput) => ActorService.update(actorId, data), {
        onSuccess() {
            toastr.success('Update actor', 'updated successful')
            push(getAdminUrl('actors'))
        },
        onError(error) {
            toastError(error, 'Update actor')
        },
    })

    const onSubmit:SubmitHandler<IActorEditInput> = async (data) => {
        await mutateAsync(data)
    }

    return {onSubmit, isLoading}
}