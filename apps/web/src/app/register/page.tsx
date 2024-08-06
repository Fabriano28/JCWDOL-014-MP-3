'use client';

import RegisterForm from "@/components/Register";
import { ChakraProvider } from "@chakra-ui/react";
import { themes } from "@/theme/themes"

export default function RegisterPage(){

    return (
        <ChakraProvider theme={themes}>
            <RegisterForm />
        </ChakraProvider>
    )
}