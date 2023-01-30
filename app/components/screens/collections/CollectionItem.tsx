import { FC } from "react"
import Link from "next/link"
import cn from 'classnames'

import { ICollection } from "./collections.interface"

import { getGenreUrl } from "@/config/url.config"

import styles from './Collections.module.scss'
import CollectionImage from "./CollectionImage"

const CollectionItem: FC<{collection: ICollection}> = ({collection}) => {

    return (
        <Link href={getGenreUrl(collection.slug)}>
            <a className={styles.collection}>
                <CollectionImage collection={collection}/>

                <div className={styles.content}>
                    <span className={styles.title}>{collection.title}</span>
                </div>

                <div className={cn(styles.behind, styles.second)}>
                    <CollectionImage collection={collection}/>
                </div>

                <div className={cn(styles.behind, styles.third)}>
                    <CollectionImage collection={collection}/>
                </div>
            </a>
        </Link>
    )
}

export default CollectionItem