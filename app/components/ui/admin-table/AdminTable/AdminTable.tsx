import { FC } from 'react'
import SkeletonLoader from '../../SkeletonLoading'

import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'

import { ITableItem } from './admin-table.interface'

import styles from './AdminTable.module.scss'

interface IAdminTable {
    tableItems: ITableItem[]
    isLoading: boolean
    headerItems: string[]
    removeHandler: (id: string) => void
}

const AdminTable: FC<IAdminTable> = ({tableItems, isLoading, headerItems, removeHandler}) => {

    return (
        <div>
            <AdminTableHeader headerItems={headerItems}/>

            {isLoading ? <SkeletonLoader count={1} height={48} className="mt-4"/>
            : tableItems.length ? tableItems.map(item => (
                <AdminTableItem
                    key={item._id}
                    tableItem={item}
                    removeHandler={() => removeHandler(item._id)}/>
            ))
            : <div className={styles.notFound}>Elements not found</div>}
        </div>
    )
}

export default AdminTable