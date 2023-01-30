import { FC, useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import cn from 'classnames'

import { UserService } from '@/services/user.service'

import { toastError } from '@/utils/toast-error'

import { useFavorites } from '../../favorites/useFavorites'

import HeartImage from './heart-animation.png'

import styles from './FavoriteButton.module.scss'

const FavoriteButton: FC<{movieId: string}> = ({movieId}) => {
    const [isClicked, setIsClicked] = useState(false)

    const {favoriteMovies, refetch} = useFavorites()

    useEffect(() => {
        if (!favoriteMovies)
            return

        const hasMovie = favoriteMovies.some(f => f._id === movieId)

        if (isClicked !== hasMovie)
            setIsClicked(hasMovie)

    }, [favoriteMovies, movieId, isClicked])

    const {mutateAsync} = useMutation(
        'update favorites',
        () => UserService.toggleFavorite(movieId),
        {
            onError: (error) => {
                toastError(error, 'Update favorite list')
            },
            onSuccess: () => {
                setIsClicked(!isClicked)
                refetch()
            }
        }
    )

    return (
        <button 
            onClick={() => mutateAsync()}
            className={cn(styles.button, {
                [styles.animate]: isClicked
            })}
            style={{background: `url(${HeartImage.src})`}}
        />
    )
}

export default FavoriteButton