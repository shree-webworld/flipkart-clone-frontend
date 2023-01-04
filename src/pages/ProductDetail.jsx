import Navbar from "../components/Navbar";
import {useState, useEffect} from "react";
import axios from "axios";
import { Button, Stack, Heading, Image, Text, Container, Box, Badge, HStack, ButtonGroup, Divider } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByID } from '../utils/store/productByIDSlice';
import { STATUSES } from '../utils/store/productByIDSlice';
import {useParams, Link} from "react-router-dom";
import ProductLoading from "../components/ProductLoading";
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Center, Flex } from '@chakra-ui/react';
import {  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer} from '@chakra-ui/react';
import { add } from '../utils/store/cartSlice';



export default function ProductDetail()
{
  let dispatch = useDispatch();
  let {data : productByID, status} = useSelector((state) => state.productByID);
  let {id} = useParams();
  const date = new Date(new Date().getTime()+(5*24*60*60*1000));

  useEffect(()=>{
                    dispatch(fetchProductsByID(id));
                },[])


                if (status === STATUSES.LOADING) {
                                                    return <ProductLoading />;
                                                }

                if (status === STATUSES.ERROR) {
                                                    return <h2>Something went wrong!</h2>;
                                                }

      let handleAdd = (product) =>{
                                      dispatch(add(product)); //add(payload)
                                  }


  return(<>
                <Navbar/>
                <Container maxW="100%" py="2rem" bgColor="#F1F3F6" centerContent>

                  <SimpleGrid columns={{base:1, md:2}}>
                  <Flex>
                  <Card maxW="xl" bgColor="white" className="md:mr-[-10rem]" h={{md:"38rem"}}>
                   <CardBody>
                    <Center>
                       <Image src={productByID.detailUrl} alt={productByID.id} objectFit="cover"/>
                   </Center>
                  </CardBody>
                  <Divider />
                  <CardFooter>

                      <ButtonGroup spacing='2' mx="2rem">
                        <Button variant='solid' bgColor="#FF9F00" color="white" w="12rem" fontSize="1.2rem"
                                leftIcon={<iconify-icon icon="zondicons:shopping-cart"></iconify-icon>}
                                borderRadius="sm" py="1.5rem" _hover={{ bg: '#FF9F00', boxShadow:'lg' }}
                                as={Link} to={"/cart"} onClick={() => handleAdd(productByID)}
                        >
                          Add to cart
                        </Button>
                        <Button variant='solid' bgColor="#FA651B" color="white" borderRadius="sm" fontSize="1.2rem"
                                leftIcon={<i className="bi bi-lightning-fill"></i>} w="12rem" py="1.5rem"
                                _hover={{ bg: '#FA651B' }}
                        >
                          Buy now
                        </Button>
                      </ButtonGroup>

                    </CardFooter>
                  </Card>
                </Flex>
                <Flex>
                  <Box bgColor="white" px="2rem" py="2rem" borderRadius="md" w={{base:"32rem",md:"50rem"}}
                        className="md:ml-[-9.5rem]">
                    {
                      productByID && Object.keys(productByID).length &&
                      (<>
                        <Heading size="md">{productByID.title.longTitle}</Heading>
                        <Text fontSize="md" color="#868B96" display="flex" mt="0.5rem">
                          <Badge variant='solid' colorScheme='green' borderRadius="md" mt="0.3rem" px="0.5rem" fontSize="0.8rem">
                              4.5&nbsp;<i className="bi bi-star-fill text-xs"></i>
                            </Badge>
                          &nbsp;&nbsp;8 Ratings & 1 Reviews&nbsp;&nbsp;
                          <span>
                            <Image src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
                                    alt="fassured" w="5rem"/>
                          </span>
                        </Text>

                        <Text size="md" color="green" mt="1rem">Special Price</Text>
                        <Box display="flex" alignItems="center">
                          <Heading size="xl">₹{productByID.price.cost}</Heading>
                          <Text as="del" fontSize="xl" fontWeight="bold" color="#868B96" mt="0.8rem" ml="1rem">
                            ₹{productByID.price.mrp}
                          </Text>
                          <Text fontSize="lg" fontWeight="semibold" color="green.700" mt="0.8rem" ml="1rem">
                            {productByID.price.discount} off
                          </Text>
                        </Box>
                        <Text fontSize="md" fontWeight="bold" color="gray.900" mt="1rem" mb="0.5rem">
                          Available offers
                        </Text>
                        <Box display="flex">
                          <i className="bi bi-tag-fill text-[#15BF47] text-lg"></i>&nbsp;&nbsp;
                            <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                              Bank Offer&nbsp;
                              <span className="text-gray-900 font-normal">
                                5% Unlimited Cashback on Flipkart Axis Bank Credit Card.
                              </span>
                            </Text>
                        </Box>
                        <Box display="flex">
                          <i className="bi bi-tag-fill text-[#15BF47] text-lg"></i>&nbsp;&nbsp;
                            <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                              Bank Offer&nbsp;
                              <span className="text-gray-900 font-normal">
                                10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply.
                              </span>
                            </Text>
                        </Box>
                        <Box display="flex">
                          <i className="bi bi-tag-fill text-[#15BF47] text-lg"></i>&nbsp;&nbsp;
                            <Text fontSize="sm" fontWeight="semibold" color="gray.900">
                              Bank Offer&nbsp;
                              <span className="text-gray-900 font-normal">
                                10% off on ICICI Bank Credit Card EMI Transactions, up to ₹2,000. On orders of ₹5,000 and above.
                              </span>
                            </Text>
                        </Box>

                        <TableContainer my="1rem">
                          <Table variant='unstyle'>
                            <TableCaption className="w-[28rem]">
                              <Image src="https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50"
                                    alt="SuperComNet"/>
                            </TableCaption>
                            <Tbody>
                              <Tr>
                                <Td className="text-gray-500 font-semibold text-md">Delivery</Td>
                                <Td>Delivery by {date.toDateString()} | ₹40</Td>
                              </Tr>
                              <Tr>
                                <Td className="text-gray-500 font-semibold text-md">Warranty</Td>
                                <Td>No Warranty</Td>
                              </Tr>
                              <Tr>
                                <Td className="text-gray-500 font-semibold text-md">Seller</Td>
                                  <Td>
                                      <Text className="text-blue-700">SuperComNet</Text>
                                      <Text className="my-1.5">GST invoice available</Text>
                                      <Text>View more sellers starting from ₹329</Text>
                                  </Td>
                              </Tr>
                            </Tbody>
                          </Table>
                        </TableContainer>

                        <Text fontSize="md" fontWeight="semibold" color="#868B96" mt="0.8rem">
                          Description :
                        </Text>
                        <Text fontSize="md" color="gray.900" mt="0.8rem" textIndent="1.5rem">
                          {productByID.description}
                        </Text>

                      </>)
                    }
                  </Box>
                </Flex>
                </SimpleGrid>

                </Container>
        </>);
}
