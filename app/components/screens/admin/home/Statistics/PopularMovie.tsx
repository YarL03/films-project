import SkeletonLoader from '@/components/ui/SkeletonLoading'
import { MovieService } from '@/services/movie.service'
import { FC } from 'react'
import { useQuery } from 'react-query'
import cn from 'classnames'

import { IMovie } from '@/shared/types/movies.types'

import styles from '../Admin.module.scss'
import SubHeading from '@/components/ui/Heading/SubHeading'
import Link from 'next/link'
import { getMovieUrl } from '@/config/url.config'
import Image from 'next/image'

const PopularMovie: FC = () => {
    const {isLoading, data: movie} = useQuery('The most popular movie in admin panel',
    () => MovieService.getMostPopularMovies(), {
        select: (data):IMovie => data[0]
            
        
    })

    return (
        <div className={cn(styles.block, styles.popular)}>
            <SubHeading title='The most popular movie'/>
            {isLoading ? <SkeletonLoader className='h-48'/>
            : movie && <>
                <h3>Opened {movie.countOpened} times</h3>
                <Link href={getMovieUrl(movie.slug)}>
                    <a>
                        <Image
                            width={285}
                            height={176}
                            src={movie.bigPoster}
                            alt={movie.title}
                            className={styles.image}
                            unoptimized
                        />
                    </a>
                </Link>
            </>}
        </div>
    )
}

export default PopularMovie