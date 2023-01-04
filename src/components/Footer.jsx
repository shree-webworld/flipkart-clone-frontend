import {Box, Center, Text} from '@chakra-ui/react';


export default function Footer()
{
  return(<>
            <Box bgColor="#2874F0">
              <Center py="0.5rem">
                <Text color="white" fontSize="lg" fontWeight="semibold" className="tracking-widest">
                  Made with <span><i className="bi bi-heart-fill text-red-500"></i></span> by Shreedhar.
                </Text>
              </Center>
            </Box>
        </>);
}
