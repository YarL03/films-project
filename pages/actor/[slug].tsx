import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'
import Error404 from '../404'

import { MovieService } from '@/services/movie.service'
import { ActorService } from '@/services/actor.service'

import { IActor, IMovie } from '@/shared/types/movies.types'


interface IActorPage {
    movies: IMovie[],
    actor: IActor | undefined
}

const ActorPage:NextPage<IActorPage> = ({movies, actor}) => {
    return actor ? (
        <Catalog 
            title={actor.name}
            movies={movies || []}
        />
    ) : <Error404/>
}

export const getStaticPaths: GetStaticPaths = async () => {
    try {

        const {data: actors} = await ActorService.getAll()

        const paths = actors.map(a => ({
            params: {slug: a.slug}
        }))

        return {
            paths,
            fallback: 'blocking'
        }

    } catch (error) {
        return {
            paths: [],
            fallback: false
        }
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    try {
        const {data: actor} = await ActorService.getBySlug(String(params?.slug))

        const {data: movies} = await MovieService.getByActor(actor._id)

        return {
            props: {
                actor, 
                movies
            }
        }

    } catch (error) {
        return {
            notFound: true
        }
    }

}

export default ActorPage