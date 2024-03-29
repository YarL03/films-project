import { FC } from "react"
import Image from "next/image"

import { ICollection } from "./collections.interface"

const CollectionImage: FC<{collection: ICollection}> = ({collection: {
    image, title
}}) => {

    return (
        <Image src={image} alt={title} layout="fill" draggable={false}/>
    )
}

export default CollectionImage