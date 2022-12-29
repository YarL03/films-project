import { FC, ReactNode } from "react"
import cn from 'classnames'
import Image from "next/image"

import SkeletonLoader from "../../SkeletonLoading"

import { IUploadField } from "../form.interface"

import { useUpload } from "./useUpload"

import styles from '../form.module.scss'

const UploadField: FC<IUploadField> = ({
    onChange, folder, value, placeholder, error, style, isNoImage = false
}) => {

    const {isLoading, uploadFile} = useUpload(onChange, folder)

    return (
        <div className={cn(styles.field, styles.uploadField)} style={style}>
            <div className={styles.uploadFlex}>
                <label>
                    <span>{placeholder}</span>
                    <input type="file" onChange={uploadFile}/>
                    {error && <div className={styles.error}>{error.message as ReactNode}</div>}
                </label>

                {!isNoImage && <div className={styles.uploadImageContainer}>
                    {isLoading ? <SkeletonLoader count={1} className="w-full h-full"/>
                    : (
                        value && <Image alt="" src={value} layout="fill" unoptimized/>
                    )}
                </div> }

            </div>
        </div>
    )
}

export default UploadField