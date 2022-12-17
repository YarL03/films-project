import Field from "@/components/ui/form-elements/Field"
import { validEmail } from "@/shared/regex"
import { FC } from "react"
import { FormState, UseFormRegister } from "react-hook-form"

interface IAuthFields {
    register: UseFormRegister<any>
    formState: FormState<any>
    isPasswordRequired?: boolean
}

const AuthFields:FC<IAuthFields> = ({
    register, formState: {errors}, isPasswordRequired = false
}) => {
    return (
        <>
            <Field {...register('email', {
                required: 'Email is required',
                pattern: {
                    value: validEmail,
                    message: 'Enter a valid email please'
                }
            })}
                placeholder="E-Mail"
                error={errors.email}
            />
            <Field {...register('password', isPasswordRequired ? {
                required: 'Password is required',
                minLength: {
                    value: 6,
                    message: 'Required length is at least 6 characters'
                }
            } : {})}
                placeholder="Password"
                error={errors.password}
            />
        </>
    )
}

export default AuthFields