import { useDebounce } from './../../../../hooks/useDebounce';
import { ChangeEvent, useState } from "react"
import { useQuery } from 'react-query';
import { MovieService } from '@/services/movie.service';

export const useSearch = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearch = useDebounce(searchTerm, 500)

    // в массивчик вторым элементом идет variable для GET-запроса
    const {isSuccess, data} = useQuery(['serch movie list', debouncedSearch],
    () => MovieService.getAllMovies(debouncedSearch), {
        select: ({data}) => data,
        enabled: !!debouncedSearch
    })
    
    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return {isSuccess, handleSearch, data, searchTerm}
}