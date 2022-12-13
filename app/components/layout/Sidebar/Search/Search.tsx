import { FC } from 'react'

import { useSearch } from './useSearch'

import styles from './Search.module.scss'
import SearchList from './SearchList/SearchList'
import SearchField from '@/components/ui/search-field/SearchField'

const Search:FC = () => {
    const {isSuccess, data, handleSearch, searchTerm} = useSearch()
    console.log(isSuccess, data)
    return (
        <div className={styles.wrapper}>
            <SearchField searchTerm={searchTerm} handleSearch={handleSearch}/>
            {isSuccess && <SearchList movies={data || []}/>}
        </div>
    )
}

export default Search