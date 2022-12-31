import { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import { stripHtml } from "string-strip-html"
import dynamic from "next/dynamic"

import AdminNavigation from "@/components/ui/admin-navigation/AdminNavigation"
import Field from "@/components/ui/form-elements/Field"
import SlugField from "@/components/ui/form-elements/SlugField/SlugField"
import Heading from "@/components/ui/heading/Heading"
import SkeletonLoader from "@/components/ui/SkeletonLoading"
import Button from "@/components/ui/form-elements/Button"

import Meta from "@/utils/meta/Meta"

import { IMovieEditInput } from "./movie-edit.interface"

import { useAdminGenres } from "./useAdminGenres"
import { useAdminActors } from "./useAdminActors"
import { useMovieEdit } from "./useMovieEdit"

import { generateSlug } from "@/utils/string/generateSlug"

import formStyles from '../../../ui/form-elements/admin-form.module.scss'
import UploadField from "@/components/ui/form-elements/UploadField/UploadField"

const DynamicSelect = dynamic(() => import('@/ui/select/Select'), {
    ssr: false
})

const MovieEdit: FC = () => {
    const {register, formState: {errors}, setValue, handleSubmit, getValues, control} = useForm<IMovieEditInput>({
        mode: 'onChange'
    })

    const {isLoading, onSubmit} = useMovieEdit(setValue)

    const {isLoading: areGenresLoading, data: genres} = useAdminGenres()

    const {isLoading: areActorsLoading, data: actors} = useAdminActors()

    return (
        <Meta title="Edit genre">
            <AdminNavigation/>
            <Heading title="Edit genre"/>
            <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
                {isLoading ? <SkeletonLoader count={3}/>
                : <>
                    <div className={formStyles.fields}>
                        <Field {...register('title', {
                            required: 'Title is required!'
                            })}
                            placeholder="Title"
                            error={errors.title}
                        />

                        <SlugField 
                            register={register}
                            error={errors.slug}
                            generate={() => {
                                setValue('slug', generateSlug(getValues('title')))
                            }}
                        />


                        <Field {...register('parameters.country', {
                            required: 'Country is required!'
                        })}
                        placeholder="Country"
                        error={errors.parameters?.country}
                        style={{width: '31%'}}
                        />

                        <Field {...register('parameters.year', {
                            required: 'Year is required!'
                        })}
                        placeholder="Year"
                        error={errors.parameters?.country}
                        style={{width: '31%'}}
                        />

                        <Field {...register('parameters.duration', {
                            required: 'Duration is required!'
                        })}
                        placeholder="Duration"
                        error={errors.parameters?.country}
                        style={{width: '31%'}}
                        />

                        {/* React Select */}

                        <Controller
                            control={control}
                            name="genres"
                            render={({
                                field,
                                fieldState: {error}
                            }) => <DynamicSelect
                                    field={field}
                                    options={genres || []}
                                    isLoading={areGenresLoading}
                                    isMulti
                                    placeholder="Genres"
                                    error={error}
                                />
                                    }   
                            rules={{
                                required: 'Please select at least one genre!'
                            }}                    
                        />
                        <Controller
                            control={control}
                            name="actors"
                            render={({
                                field,
                                fieldState: {error}
                            }) => <DynamicSelect
                                    field={field}
                                    options={genres || []}
                                    isLoading={areActorsLoading}
                                    isMulti
                                    placeholder="Actors"
                                    error={error}
                                />
                                    }   
                            rules={{
                                required: 'Please select at least one actor!'
                            }}                    
                        />
                        <Controller
                            control={control}
                            name="poster"
                            defaultValue=""
                            render={({
                                field: {
                                    value, onChange
                                },
                                fieldState: {error}
                            }) => <UploadField
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    folder="movies"
                                    placeholder="Poster"
                                />
                                    }   
                            rules={{
                                required: 'Poster is required!'
                            }}                    
                        />

                        <Controller
                            control={control}
                            name="bigPoster"
                            defaultValue=""
                            render={({
                                field: {
                                    value, onChange
                                },
                                fieldState: {error}
                            }) => <UploadField
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    folder="movies"
                                    placeholder="Big oster"
                                />
                                    }   
                            rules={{
                                required: 'Big poster is required!'
                            }}                    
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
                            }) => <UploadField
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    folder="movies"
                                    placeholder="Video"
                                    style={{marginTop: -25}}
                                    isNoImage
                                />
                                    }   
                            rules={{
                                required: 'Video is required!'
                            }}                    
                        />

                        
                        
                        <Button>Update</Button>
                    </div>    
                </>
            }
            </form>
        </Meta>
    )
}

export default MovieEdit