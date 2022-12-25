import { FC, ChangeEvent } from 'react'
import SearchField from '../../search-field/SearchField'
import AdminCreateButton from './AdminCreateButton'

import styles from './AdminHeader.module.scss'

interface IAdminHeader {
    onClick?: () => void
    searchTerm: string
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const AdminHeader: FC<IAdminHeader> = ({onClick, searchTerm, handleSearch}) => {

    return (
        <div className={styles.header}>
            <SearchField searchTerm={searchTerm} handleSearch={handleSearch}/>
            {onClick && <AdminCreateButton onClick={onClick}/>}
        </div>
    )
}

export default AdminHeader