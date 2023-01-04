import { Table, Thead, Tbody, Tr, Td, TableCaption, TableContainer, Text, Box, useToast } from '@chakra-ui/react';
import StripeCheckout from 'react-stripe-checkout';
import {useState, useEffect} from "react";
import {quantityAtom} from "../utils/store/atom";
import { useAtom } from 'jotai';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {clearCart} from "../utils/store/cartSlice";
import { useSelector, useDispatch } from 'react-redux';  //get data from redux store useSelector.



export default function CartTotalValue({cartProduct})
{
      const base_url = import.meta.env.VITE_BASE_URL;
      const stripe_key = import.meta.env.VITE_STRIPE_KEY;
      const dispatch = useDispatch();

      const [price, setPrice] = useState(0);
      const [discount, setDiscount] = useState(0);
      let toast = useToast();
      const navigate = useNavigate();
      let [totalQuantity, setTotalQuantity] = useAtom(quantityAtom);


      const totalAmount = () => {
                                  let price = 0, discount = 0, totalQuantity = 0 ;
                                  cartProduct.map(item => {
                                                            price += item.price.mrp * item.addCartQuantity;
                                                            discount += (item.price.mrp - item.price.cost) * item.addCartQuantity;
                                                            totalQuantity += item.addCartQuantity;
                                                        });
                                  setPrice(price);
                                  setDiscount(discount);
                                  setTotalQuantity(totalQuantity);
                              }

                    const payNow = async (token) => {
                                                         try {
                                                           const response = await axios.post(`${base_url}/payment`,{amount: price + discount + 40, token});
                                                           console.log(response);
                                                           if (response.status === 200)
                                                           {
                                                             navigate("/");
                                                             toast({
                                                                       title: 'Success',
                                                                       description: "Payment done successfully",
                                                                       status: 'success',
                                                                       duration: 4000,
                                                                       position:"top",
                                                                       isClosable: true,
                                                                  });

                                                              dispatch(clearCart());
                                                           }
                                                         }catch (error)
                                                         {
                                                           toast({
                                                                     title: 'Failure',
                                                                     description: "Payment Transactions Unsuccessful.",
                                                                     status: 'error',
                                                                     duration: 4000,
                                                                     position:"top",
                                                                     isClosable: true,
                                                                })
                                                           console.log(error);
                                                         }
                                                       };


      useEffect(() => {
                          totalAmount();
                      }, [cartProduct]);

  return(<>
    <Box className="bg-gray-100" boxShadow="xl" p="2" borderRadius='lg'>
      <TableContainer>
       <Table variant='unstyled'>
         <TableCaption>
             <Text color="green.500" fontSize="md" mb="1rem">
               You will save ₹
               {discount - 40} on this order.
             </Text>
               <StripeCheckout
                       stripeKey={stripe_key}
                       label="Pay Now"
                       name="Pay With Credit/Debit Card"
                       amount={(price - discount + 40)*100}
                       description={`Your total is ₹${price - discount + 40}/-`}
                       token={payNow}
                       currency="INR"
                     />

         </TableCaption>
         <Tbody>
          <Tr className="text-base">
            <Td>Price ({totalQuantity} items):</Td>
            <Td>₹ {price}/-</Td>
          </Tr>
          <Tr className="text-base">
            <Td>Discount : </Td>
            <Td color="green.500">-&nbsp;₹ {discount}/-</Td>
          </Tr>
          <Tr className="text-base">
            <Td>Delivery Charges :</Td>
            <Td>₹ 40/-</Td>
          </Tr>
          <Tr className="text-lg text-gray-900 divide-y-2 divide-blue-200 divide-dotted">
            <Td>Total Amount :</Td>
            <Td color="blue.500">₹ {price - discount + 40}/-</Td>
          </Tr>
         </Tbody>
       </Table>
      </TableContainer>
    </Box>

        </>);
}
