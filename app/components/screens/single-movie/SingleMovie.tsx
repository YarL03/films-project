import { FC } from "react"

import Banner from "@/components/ui/banner/Banner"
import SubHeading from "@/components/ui/heading/SubHeading"

import Meta from "@/utils/meta/Meta"

import { IMoviePage } from "../../../../pages/movie/[slug]"
import { IMovie } from "@/shared/types/movies.types"
import Gallery from "@/components/ui/gallery/Gallery"
import Content from "./Content/Content"

interface ISingleMoviePage extends IMoviePage {
    movie: IMovie
}

const SingleMovie: FC<ISingleMoviePage> = ({movie, similarMovies}) => {

    return (
        <Meta title={movie.title} description={`Watch ${movie.title}`}>
            <Banner image={movie.bigPoster} Detail={() => <Content movie={movie}/>}/>

            {/* Video player */}

            <div className="mt-12">
                <SubHeading title="Similar"/>
                <Gallery items={similarMovies}/>
            </div>

            {/* Raiting */}
        </Meta>
    )
}

export default SingleMovie