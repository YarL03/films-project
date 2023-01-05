import Image from "next/image"
import { FC } from "react"
import { IBanner } from "./banner.interface"

import styles from './Banner.module.scss'

const Banner: FC<IBanner> = ({image, Detail}) => {

    return (
        <div className={styles.banner}>
            <Image
                alt=""
                src={image}
                draggable={false}
                layout="fill"
                className="image-like-bg object-top"
                unoptimized
                priority
            />
            {Detail && <Detail/>}
        </div>
    )
}

export default Banner