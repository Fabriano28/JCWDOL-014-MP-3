"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Box,
    Center,
} from '@chakra-ui/react'

type Inputs = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
}

const RegisterForm = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();   

    const handleRegister = async (data: Inputs) =>{
        setIsLoading(true);
        setError(null);

        try {
            console.log(data);
            const response = await axios.post('http://localhost:8000/api/register', data);
            console.log(response);

            router.push("/login");
        } catch (err: any) {
            console.log(err);
            setError(err.response?.data?.message || "Login failed");
        }  finally {
            setIsLoading(false);
        }
    }

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        handleRegister(data);
    }

    return (

        <div>
            <Center>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={Boolean(errors.email)}>
                            <FormLabel htmlFor='email'>Email</FormLabel>
                            <Input
                                id='email'
                                placeholder='email'
                                {...register('email', {
                                    required: 'This is required',
                                    minLength: { value: 4, message: 'Minimum length should be 4' },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                            <FormLabel htmlFor='first_name'>First Name</FormLabel>
                            <Input
                                id='first_name'
                                placeholder='first_name'
                                {...register('first_name', {
                                    required: 'This is required',
                                    minLength: { value: 4, message: 'Minimum length should be 4' },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                            <FormLabel htmlFor='last_name'>Last Name</FormLabel>
                            <Input
                                id='last_name'
                                placeholder='last_name'
                                {...register('last_name', {
                                    required: 'This is required',
                                    minLength: { value: 4, message: 'Minimum length should be 4' },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.email && errors.email.message}
                            </FormErrorMessage>
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input
                                id='password'
                                placeholder='password'
                                {...register('password', {
                                    required: 'This is required',
                                    minLength: { value: 4, message: 'Minimum length should be 4' },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button mt={4} colorScheme='teal' isLoading={isLoading} type='submit'>
                            Submit
                        </Button>
                    </form>
                </Box>
            </Center>
        </div>
    );
};

export default RegisterForm;