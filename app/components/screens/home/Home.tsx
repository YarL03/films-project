import Gallery from "@/components/ui/gallery/Gallery"
import Heading from "@/components/ui/Heading/Heading"
import SubHeading from "@/components/ui/Heading/SubHeading"
import Slider from "@/components/ui/slider/Slider"
import Meta from "@/utils/meta/Meta"
import { FC } from "react"
import { IHome } from "./home.interface"

const Home: FC<IHome> = ({slides, actors, trendingMovies}) => {
    return (
        <Meta
            title="Watch movies online"
            description="Watch MovieApp movies and TV shows online or stream right to your browser"
        >
            <Heading title="Watch movies online" className="text-grey-300 mb-8 text-xl"/>

            {slides.length && <Slider slides={slides}/>}

            <div className="my-10">
                <SubHeading title="Trending now"/>
                {trendingMovies.length && <Gallery items={trendingMovies}/>}
            </div>

            <div className="my-10">
                <SubHeading title="The best actors"/>
                {actors.length && <Gallery items={actors}/>}
            </div>
        </Meta>
    )
}

export default Home