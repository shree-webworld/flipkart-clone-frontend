import {Text, Button, HStack, Box} from "@chakra-ui/react";
import {useState} from "react";
import {quantityAtom} from "../utils/store/atom";
import { useAtom } from 'jotai';


export default function CartQuantity({quantityCount, setIncrease, setDecrease})
{

  return(<>
          <HStack>
              <Button size="sm" colorScheme='telegram' variant='outline' borderRadius="3rem" onClick={() =>setDecrease()}>
                −
              </Button>
              <Box border='1px' borderColor='gray.900' px="1.2rem" py="0.3rem">
                {quantityCount}
              </Box>
              <Button size="sm" colorScheme='telegram' variant='outline' borderRadius="3rem" onClick={()=>setIncrease()}>
                +
               </Button>
           </HStack>

        </>);
}
