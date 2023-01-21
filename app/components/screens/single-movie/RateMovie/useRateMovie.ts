import { useState } from 'react' 
import { useMutation, useQuery } from 'react-query'

import { RatingService } from '@/services/rating.service'
import { toastError } from '@/utils/toast-error'
import { toastr } from 'react-redux-toastr'

export const useRateMovie = (movieId: string) => {
    const [rating, setRating] = useState(0)
    const [isSent, setIsSent] = useState(false)

    const {refetch} = useQuery(['your movie rating', movieId], () => RatingService.getByUserMovie(movieId), {
        onSuccess({data}) {
            setRating(data)
        },
        onError(error) {
            toastError(error, 'Get rating')
        },
        enabled: !!movieId
    })

    const {mutateAsync} = useMutation('set movie rating', ({value}: {value: number}) => RatingService.setRating(movieId, value), {
        onSuccess() {
            toastr.success('Movie rating', 'updated successful')
            
            setIsSent(true)
            refetch()

            setTimeout(() => {
                setIsSent(false)
            }, 2400)
        },
        onError(error) {
            toastError(error, 'Movie rating')
        },
    })

    const handleClick = async (nextValue: number) => {
        setRating(nextValue)

        await mutateAsync({value: nextValue})
    }

    return {
        isSent,
        rating,
        handleClick
    }
}