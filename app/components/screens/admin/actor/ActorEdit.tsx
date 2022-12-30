import { FC } from "react"
import { Controller, useForm } from "react-hook-form"

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation"
import Field from "@/components/ui/form-elements/Field"
import SlugField from "@/components/ui/form-elements/SlugField/SlugField"
import Heading from "@/components/ui/Heading/Heading"
import SkeletonLoader from "@/components/ui/SkeletonLoading"
import Button from "@/components/ui/form-elements/Button"

import Meta from "@/utils/meta/Meta"

import { IActorEditInput } from "./actor-edit.interface"

import { useActorEdit } from "./useActorEdit"
import { generateSlug } from "@/utils/string/generateSlug"

import formStyles from '../../../ui/form-elements/admin-form.module.scss'
import UploadField from "@/components/ui/form-elements/UploadField/UploadField"


const ActorEdit: FC = () => {
    const {register, formState: {errors}, setValue, handleSubmit, getValues, control} = useForm<IActorEditInput>({
        mode: 'onChange'
    })

    const {isLoading, onSubmit} = useActorEdit(setValue)

    return (
        <Meta title="Edit actor">
            <AdminNavigation/>
            <Heading title="Edit actor"/>
            <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
                {isLoading ? <SkeletonLoader count={3}/>
                : <>
                    <div className={formStyles.fields}>
                        <Field {...register('name', {
                            required: 'Name is required!'
                        })}
                        placeholder="Name"
                        error={errors.name}
                        />

                            <SlugField 
                                register={register}
                                error={errors.slug}
                                generate={() => {
                                    setValue('slug', generateSlug(getValues('name')))
                                }}
                                />

                        <Controller
                            control={control}
                            name="photo"
                            defaultValue=""
                            render={({
                                field: {
                                    value, onChange
                                },
                                fieldState: {error}
                            }) => <UploadField onChange={onChange} value={value} folder="actors" placeholder="Photo"/>
                                    }   
                            rules={{
                                required: 'Photo is required!'
                            }}                    
                        />
                    </div>
                        
                    <Button>Update</Button>
                </>
            }
            </form>
        </Meta>
    )
}

export default ActorEdit