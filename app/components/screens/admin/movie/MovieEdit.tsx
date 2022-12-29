import { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import { stripHtml } from "string-strip-html"
import dynamic from "next/dynamic"

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation"
import Field from "@/components/ui/form-elements/Field"
import SlugField from "@/components/ui/form-elements/SlugField/SlugField"
import Heading from "@/components/ui/Heading/Heading"
import SkeletonLoader from "@/components/ui/SkeletonLoading"
import Button from "@/components/ui/form-elements/Button"

import Meta from "@/utils/meta/Meta"

import { IMovieEditInput } from "./movie-edit.interface"

import { useMovieEdit } from "./useMovieEdit"
import { generateSlug } from "@/utils/string/generateSlug"

import formStyles from '../../../ui/form-elements/admin-form.module.scss'

const DynamicTextEditor = dynamic(() => import('@/components/ui/form-elements/TextEditor'), {
    ssr: false
})

const MovieEdit: FC = () => {
    const {register, formState: {errors}, setValue, handleSubmit, getValues, control} = useForm<IMovieEditInput>({
        mode: 'onChange'
    })

    const {isLoading, onSubmit} = useMovieEdit(setValue)

    return (
        <Meta title="Edit genre">
            <AdminNavigation/>
            <Heading title="Edit genre"/>
            <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
                {isLoading ? <SkeletonLoader count={3}/>
                : <>
                    {/* <div className={formStyles.fields}>
                        <Field {...register('name', {
                            required: 'Name is required!'
                        })}
                        placeholder="Name"
                        error={errors.name}
                        style={{width: '31%'}}
                        />

                        <div style={{width: '31%'}}>
                            <SlugField 
                                register={register}
                                error={errors.slug}
                                generate={() => {
                                    setValue('slug', generateSlug(getValues('name')))
                                }}
                                />
                        </div>

                        <Field {...register('icon', {
                            required: 'Icon is required!'
                        })}
                        placeholder="Icon"
                        error={errors.icon}
                        style={{width: '31%'}}
                        />

                        <Controller
                            control={control}
                            name="videoUrl"
                            defaultValue=""
                            render={({
                                field: {
                                    value, onChange
                                },
                                fieldState: {error}
                            }) => <DynamicTextEditor 
                                        onChange={onChange}
                                        value={value}
                                        error={error}
                                        placeholder="Description"
                                    />
                                    }   
                            rules={{
                                validate: {
                                    required: (v) => 
                                    (v && stripHtml(v).result.length > 0) || 'Description is required!'
                                }
                            }}                    
                        />

                        
                        
                        <Button>Update</Button>
                    </div>     */}
                </>
            }
            </form>
        </Meta>
    )
}

export default MovieEdit