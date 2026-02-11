import { useForm } from "@tanstack/react-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
} from "@/components/ui/input-group"
import { useLogin } from "@/hooks/useAuth"
import type { AuthInputs } from "@/lib/api/auth"
import { useEffect } from "react"
import { getAccessToken } from "@/lib/auth-tokens"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    email: z
        .email({ message: "Please enter a valid email address." })
        .nonempty({ message: "Email is required." }),
    password: z
        .string()
        .min(6, "Password must be at least 8 characters.")
        .max(100, "Password must be at most 100 characters.")
        .nonempty({ message: "Password is required." }),
})

export function Login() {
    const navigate = useNavigate();
    const { mutate: login } = useLogin()
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }: { value: AuthInputs }) => {
            login(value)
        },
    })

    useEffect(() => {
        if (getAccessToken()) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl mb-2">Login form</CardTitle>
                    <CardDescription>
                        Please enter your login credentials.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        id="bug-report-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <FieldGroup>
                            <form.Field
                                name="email"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                aria-invalid={isInvalid}
                                                placeholder="Enter your email"
                                                autoComplete="off"
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            />
                            <form.Field
                                name="password"
                                children={(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                            <InputGroup>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    type="password"
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    placeholder="Enter your password"
                                                    autoComplete="off"
                                                />
                                            </InputGroup>
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    )
                                }}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter>
                    <Field orientation="horizontal" className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form="bug-report-form">
                            Submit
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </div>
    )
}
