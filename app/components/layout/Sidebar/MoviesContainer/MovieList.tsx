import Link from 'next/link'
import { FC } from 'react'

import { IMovieList } from './movie-list.interface'
import MovieItem from './MovieItem'

import styles from './MovieList.module.scss'

const MovieList:FC<IMovieList> = ({link, movies, title}) => {

    return (
        <div className={styles.list}>
            <div className={styles.heading}>
                {title}
            </div>
            {movies.map(movie => (
            <MovieItem movie={movie} key={movie._id}/>
            ))}
            <Link href={link}>
                <a className={styles.button}>
                    See more
                </a>
            </Link>
        </div>
    )
}

export default MovieList