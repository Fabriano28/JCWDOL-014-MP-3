import LoginForm from "@/components/Login";
import { ChakraProvider } from "@chakra-ui/react";

export default function LoginPage(){

    return (
        <ChakraProvider>
            <LoginForm />
        </ChakraProvider>
    )
}