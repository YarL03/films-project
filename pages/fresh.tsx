import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { MovieService } from '@/services/movie.service'

import { IMovie } from '@/shared/types/movies.types'


const FreshPage:NextPage<{movies: IMovie[]}> = ({movies}) => {
    return (
        <Catalog 
            title="Fresh movies"
            movies={movies || []}
            description="New movies and series in excellent quality: legal, safe, without ads"    
        />
    )
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const {data: movies} = await MovieService.getAll()

        return {
            props: {
                movies
            }
        }

    } catch (error) {
        return {
            notFound: true
        }
    }

}

export default FreshPage
