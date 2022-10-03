import { IMenuItem } from './../menu.interface';
import { GenreService } from './../../../../../services/genre.service';
import { useQuery } from "react-query"
import { getGenreUrl } from '@/config/url.config';

export const usePopularGenres = () => {
    const queryData = useQuery('popular genres menu', () => 
    GenreService.getAllGenres(), {
        select: ({data}) => data.map(genre => ({
            icon: genre.icon,
            link: getGenreUrl(genre.slug),
            title: genre.name
        } as IMenuItem)).splice(0, 4),

        onError(error) {
            //error
        },
    })

    return queryData
}