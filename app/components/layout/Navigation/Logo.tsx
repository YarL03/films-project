import Link from "next/link"
import { FC } from "react"

import logoImage from '@/assets/images/logo.svg'
import Image from "next/image"

const Logo: FC = () => {
    return (
        <Link href='/'>
            <a className="px-layout mb-10 block">
                <Image 
                    width={130} 
                    height={34} 
                    alt='Online cinema' 
                    src={logoImage}
                    draggable={false}
                />
            </a>
        </Link>
    )
}

export default Logo