import {Container, VStack, Image, Box, Heading, Link} from  '@chakra-ui/react';
import { NavLink } from "react-router-dom";

export default function CartEmpty()
{
  return(<>
            <Container maxW="76rem" bgColor="white" mt="3.5rem">
             <Box display="grid" gridGap={3} gridAutoFlow="row dense" boxShadow="dark-lg">
               <VStack spacing="1rem" my="3rem">
               <Image src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                      alt="CartEmpty" objectFit="cover" w="20rem"/>
                    <Heading size="md">Your cart is empty!</Heading>
                <Link color="blue.600" as={NavLink} to="/">Start shopping</Link>
              </VStack>
             </Box>
            </Container>
        </>);
}
