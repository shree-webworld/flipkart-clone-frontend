import { CircularProgress, CircularProgressLabel, Center } from '@chakra-ui/react';

export default function ProductLoading()
{
  return(<>
              <Center>
              <CircularProgress isIndeterminate color='blue.500' size="20rem" mt="10rem" thickness='0.6rem'>
                <CircularProgressLabel fontSize="3rem">
                  Loading..
                </CircularProgressLabel>
              </CircularProgress>
            </Center>
        </>);
}
