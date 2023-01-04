import {Container, VStack, Image, Box, Heading} from  '@chakra-ui/react';
import Wrong from "../assets/Notify.png";

export default function SomethingWrong()
{
  return(<>
            <Container maxW="76rem" bgColor="white" mt="3.5rem">
             <Box display="grid" gridGap={3} gridAutoFlow="row dense" boxShadow="dark-lg">
               <VStack spacing="1rem" my="3rem">
               <Image src={Wrong}
                      alt="Something Went Wrong" objectFit="cover" w="20rem"/>
                    <Heading size="md">Oops!! Something Went Wrong!</Heading>
              </VStack>
             </Box>
            </Container>
        </>);
}
