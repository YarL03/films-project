import { FC } from "react"
import Link from "next/link"
import Image from "next/image"

import FavoriteButton from "../single-movie/FavoriteButton/FavoriteButton"

import { IMovie } from "@/shared/types/movies.types"

import { getMovieUrl } from "@/config/url.config"

import styles from './Favorites.module.scss'

const FavoriteItem: FC<{movie: IMovie}> = ({ movie }) => {

    return (
        <div className={styles.itemWrapper}>
            <FavoriteButton movieId={movie._id}/>
            <Link href={getMovieUrl(movie.slug)}>
                <a className={styles.item}>
                    <Image
                        alt={movie.title}
                        src={movie.bigPoster}
                        layout="fill"
                        draggable={false}
                        priority
                    />

                    <div className={styles.title}>{movie.title}</div>
                </a>
            </Link>
        </div>
    )
}

export default FavoriteItem