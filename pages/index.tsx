import type { GetStaticProps, NextPage } from 'next'

import Home from '@/components/screens/home/Home'
import { MovieService } from '@/services/movie.service'
import { ISlide } from '@/components/ui/slider/slider.interface'
import { getActorUrl, getMovieUrl } from '@/config/url.config'
import { getGenresList } from '@/utils/movie/getGenresList'
import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ActorService } from '@/services/actor.service'

const HomePage: NextPage<IHome> = ({slides, trendingMovies, actors}) => {
  return <Home trendingMovies={trendingMovies} actors={actors} slides={slides}/>
  
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const {data: movies} = await MovieService.getAll()

    const slides: ISlide[] = movies.slice(0, 3).map((movie) => ({
      _id: movie._id,
      link: getMovieUrl(movie.slug),
      bigPoster: movie.bigPoster,
      subTitle: getGenresList(movie.genres),
      title: movie.title
    }))

    const {data: dataActors} = await ActorService.getAll()

    const actors: IGalleryItem[] = dataActors.slice(0,7).map(actor => ({
      name: actor.name,
      posterPath: actor.photo,
      link: getActorUrl(actor.slug),
      content: {
        title: actor.name,
        subTitle: `+${actor.countMovies} movies`
      }
    }))

    const dataTrendingMovies = await MovieService.getMostPopularMovies()

    const trendingMovies: IGalleryItem[] = dataTrendingMovies.slice(0,7).map(m => ({
      name: m.title,
      posterPath: m.poster,
      link: getMovieUrl(m.slug)
    }))

    return {
      props: {
        slides,
        actors,
        trendingMovies
      } as IHome
    }
  } catch (error) {
    return {
      props: {
        slides: [],
        actors: [],
        trendingMovies: []
      }
    }
  }
}

export default HomePage
