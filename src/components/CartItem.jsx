import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import {Image, HStack, VStack, Box, Text, Button, Avatar, Heading, Hide} from "@chakra-ui/react";
import {useDispatch} from "react-redux"; //to make store changes use dispatch.
import {remove, setDecrease, setIncrease} from "../utils/store/cartSlice";
import CartQuantity from "./CartQuantity";
import {useState} from "react";



export default function CartItem({ item })
{
  const dispatch = useDispatch();
  let { addCartQuantity, quantity} = item;

  // let [quantityCount, setQuantityCount] = useState(addCartQuantity);

  /*let setDecrease = () => {
                            quantityCount > 1 ? setQuantityCount(quantityCount - 1) : setQuantityCount(1);
                          };

  let setIncrease = () => {
                            quantityCount < quantity ? setQuantityCount(quantityCount + 1) : setQuantityCount(quantity);
                          };*/

  let handleRemove = (productId) =>{
                                      dispatch(remove(productId));
                                   }

  return(<>
          <Tr>
            <Td>
              <HStack>
                <Image boxSize='3.8rem' objectFit='cover' src={item.detailUrl} alt={item.id} mr="0.5rem"/>
                <VStack spacing="1rem">
                  <Text size="lg" className="capitalize">{item.title.shortTitle}</Text>
                  <HStack>
                    <Text size="md" color="gray.500" fontWeight="semibold">
                      Seller : RetailNet
                    </Text>
                    <Image src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                            alt="fassured" w="4rem"/>
                  </HStack>
                  <Box display="flex">
                    <Heading size="sm">₹{item.price.cost}</Heading>
                    <Text as="del" fontSize="sm" fontWeight="bold" color="#868B96"  ml="1rem">
                      ₹{item.price.mrp}
                    </Text>
                    <Text fontSize="sm" fontWeight="semibold" color="green.700"  ml="1rem">
                      {item.price.discount} off
                    </Text>
                  </Box>
                  <Button color='red.600' size="md" variant='link' onClick={() => handleRemove(item.id)}>
                      Remove
                  </Button>
                </VStack>
              </HStack>
            </Td>

            <Hide below="md">
              <Td>
                  ₹ {item.price.mrp}
              </Td>
           </Hide>

            <Td>
                <CartQuantity quantityCount={addCartQuantity}
                              setDecrease={()=> dispatch(setDecrease(item))}
                              setIncrease={()=> dispatch(setIncrease (item))}
                />
            </Td>

            <Hide below="md">
              <Td fontWeight="semibold">
                ₹ {item.price.cost * item.addCartQuantity}
              </Td>
            </Hide>

          </Tr>
        </>);
}
