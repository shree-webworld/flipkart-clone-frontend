import { Heading, useToast} from '@chakra-ui/react';
import Navbar from "../components/Navbar";
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Button, VStack,
          Flex, Text, Spacer, Show, Center, Box, Divider, Hide} from '@chakra-ui/react';
import {NavLink} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';  //get data from redux store useSelector.
import CartItem from "../components/CartItem";
import {useState, useEffect} from "react";
import CartEmpty from "../components/CartEmpty";
import {clearCart} from "../utils/store/cartSlice";
import CartTotalValue from "../components/CartTotalValue"


export default function Cart()
{

  let cartProduct = useSelector((state) =>state.cart);
  const base_url = import.meta.env.VITE_BASE_URL;

  const dispatch = useDispatch();


  let handleClearCart = () =>{
                                  dispatch(clearCart());
                             }


  return(<>
              <Navbar />
              {
                cartProduct.length  ?
                <TableContainer mt="2rem" bgColor="gray.50">
                  <Table variant='simple'>
                    <TableCaption mx="3rem" mb="2rem">
                      <Flex>
                      <Button as={NavLink} to="/"  colorScheme="messenger">
                        Continue Shopping
                      </Button>
                      <Spacer/>
                      <VStack>
                      <Button colorScheme="red"  mb="2rem" onClick={() => handleClearCart()} variant='outline'>
                        Clear Cart
                      </Button>
                      <CartTotalValue cartProduct={cartProduct}/>
                    </VStack>
                    </Flex>
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Item</Th>
                        <Hide below="md">
                          <Th>Price</Th>
                        </Hide>
                        <Th>Quantity</Th>
                        <Hide below="md">
                          <Th>Subtotal</Th>
                        </Hide>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        cartProduct.map((item) => {
                                                      return <CartItem key={item.id} item={item} />;
                                                  }
                                )
                      }
                    </Tbody>
                  </Table>
                </TableContainer> : <CartEmpty />
              }
        </>);
}
