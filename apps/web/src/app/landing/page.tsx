import Landing from "@/components/Landing";
import { ChakraProvider } from "@chakra-ui/react";

export default function LandingPage(){

    return (
        <ChakraProvider>
            <Landing />
        </ChakraProvider>
    )
}