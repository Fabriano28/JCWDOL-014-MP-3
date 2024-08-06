'use client';

import LoginForm from "@/components/Login";
import { ChakraProvider } from "@chakra-ui/react";
import { themes } from "@/theme/themes"

export default function LoginPage(){

    return (
        <ChakraProvider theme={themes}>
            <LoginForm />
        </ChakraProvider>
    )
}