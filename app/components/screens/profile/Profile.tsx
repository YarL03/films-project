import { FC } from "react"
import { useForm } from "react-hook-form"

import Button from "@/components/ui/form-elements/Button"
import Heading from "@/components/ui/heading/Heading"
import SkeletonLoader from "@/components/ui/SkeletonLoading"

import AuthFields from "../auth/AuthFields"

import Meta from "@/utils/meta/Meta"

import { IProfileInput } from "./profile.interface"

import { useProfile } from "./useProfile"

import styles from './Profile.module.scss'

const Profile: FC = () => {
    const {register, formState, handleSubmit, setValue} = useForm<IProfileInput>({
        mode: 'onChange'
    })

    const {onSubmit, isLoading} = useProfile(setValue)

    return (
        <Meta title="Profile">
                <Heading title="Profile" className="mb-6"/>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    {isLoading ? <SkeletonLoader count={2}/> :
                    <>
                    <AuthFields
                        formState={formState}
                        register={register}
                    />

                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            Update
                        </Button>
                    </>
                    }
                </form>
        </Meta>
    )
}

export default Profile