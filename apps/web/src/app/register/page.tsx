import RegisterForm from "@/components/Register";
import { ChakraProvider } from "@chakra-ui/react";

export default function RegisterPage(){

    return (
        <ChakraProvider>
            <RegisterForm />
        </ChakraProvider>
    )
}