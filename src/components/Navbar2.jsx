import { Box, Image, Text, Center } from '@chakra-ui/react';
import {navData} from "../utils/Data";

export default function Navbar()
{
    return(<>
      {
        navData.map((temp,index) =>(
                            <Box my="0.3rem" cursor="pointer" mx={{md:"3.5rem"}} bg="white" key={index}>
                              <Center>
                                <Image src={temp.url} alt='flipkart_logo' h="4rem" objectFit='cover'/>
                              </Center>
                                <Text color="gray.900" fontSize="md" _hover={{color:"blue"}}
                                      textAlign="center">
                                    {temp.text}
                                </Text>
                             </Box>
                           )
                   )
     }
          </>);
}
