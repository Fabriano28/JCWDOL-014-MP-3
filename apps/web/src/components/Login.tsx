import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import axios from "axios";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    ButtonGroup,
    Button,
    Box,
    Center,
    Heading,
} from '@chakra-ui/react'

type Inputs = {
    email: string,
    password: string,
}

const LoginForm = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();   

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<Inputs>();

    const handleLogin = async (data: Inputs) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/api/login', data);
            console.log(response.data);

            const userData = response.data.data;
            const token = userData.token;
            localStorage.setItem("jwtToken", token);
        
            if (userData.user.role.role_name === 'user') {
              router.push('/landing');
            } else if (userData.user.role.role_name === 'event organizer') {
                router.push('/landing');
            } else {
              console.log("No user data found in response");
            }
        } catch (err: any) {
            console.log(err);
            setError(err.response?.data?.message || "Register failed");
        } finally {
            setIsLoading(false);
        }
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        handleLogin(data);
        reset();
    }

    const onClickRegister = () => {
        router.push('/register');
    }

    useEffect(()=> {
        if(localStorage.getItem('jwtToken')){
            localStorage.removeItem('jwtToken');
        }
    }, []);

    return (

        <div>
            <Center>
                <Box>
                    <Center>
                        <Box mt='5' mb='5'>
                            <Heading>Login</Heading>
                        </Box>
                    </Center>

                    <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl variant='floating' isInvalid={Boolean(errors.email)} mb={4}>
                                <Input
                                    id='email'
                                    placeholder=' '
                                    {...register('email', {
                                        required: 'This is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: 'Invalid email format',
                                        },
                                    })}
                                />
                                <FormLabel htmlFor='email'>Email</FormLabel>
                                <FormErrorMessage>
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl variant='floating' isInvalid={Boolean(errors.email)} mb={4}>
                                <Input
                                    id='password'
                                    placeholder=' '
                                    {...register('password', {
                                        required: 'This is required',
                                        minLength: { value: 4, message: 'Minimum length should be 4' },
                                    })}
                                />
                                <FormLabel htmlFor='email'>Password</FormLabel>
                                <FormErrorMessage>
                                    {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                        <Center>
                            <ButtonGroup>
                                <Button colorScheme='teal' isLoading={isLoading} type='submit'>
                                    Login
                                </Button>
                                <Button colorScheme='gray' onClick={ onClickRegister }>
                                    Register
                                </Button>
                            </ButtonGroup>
                        </Center>
                        
                    </form>
                </Box>
            </Center>
        </div>
    );
};

export default LoginForm;