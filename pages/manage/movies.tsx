import MovieList from "@/components/screens/admin/movies/MovieList"
import { NextPageAuth } from "@/shared/types/auth.types"

const Movies: NextPageAuth = () => {

    return (
        <MovieList/>
    )
}

// Users.isOnlyAdmin = true 

export default Movies