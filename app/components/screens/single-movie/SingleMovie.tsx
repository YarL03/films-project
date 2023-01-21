import { FC } from "react"
import dynamic from "next/dynamic"

import Banner from "@/components/ui/banner/Banner"
import SubHeading from "@/components/ui/heading/SubHeading"
import Gallery from "@/components/ui/gallery/Gallery"

import Meta from "@/utils/meta/Meta"

import { IMoviePage } from "../../../../pages/movie/[slug]"

import { IMovie } from "@/shared/types/movies.types"

import Content from "./Content/Content"
import { useUpdateCountOpened } from "./useUpdateCountOpened"

const DynamicPlayer = dynamic(() => import("@/components/ui/video-player/VideoPlayer"), {
    ssr: false
})

const DynamicRateMovie = dynamic(() => import("./RateMovie/RateMovie"), {
    ssr: false
})

interface ISingleMoviePage extends IMoviePage {
    movie: IMovie
}

const SingleMovie: FC<ISingleMoviePage> = ({movie, similarMovies}) => {
    useUpdateCountOpened(movie.slug)

    return (
        <Meta title={movie.title} description={`Watch ${movie.title}`}>
            <Banner image={movie.bigPoster} Detail={() => <Content movie={movie}/>}/>

            <DynamicPlayer slug={movie.slug} videoSource={movie.videoUrl}/>

            <div className="mt-12">
                <SubHeading title="Similar"/>
                <Gallery items={similarMovies}/>
            </div>

            <DynamicRateMovie id={movie._id} slug={movie.slug}/>
        </Meta>
    )
}

export default SingleMovie