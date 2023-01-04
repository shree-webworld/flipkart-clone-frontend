import { Flex, Spacer, Box, Button, ButtonGroup, Heading, Image, Text, HStack } from '@chakra-ui/react';
import Search from "./Search";
import LoginButton from "./LoginButton";
import ProfileMenu from "./ProfileMenu";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import {quantityAtom} from "../utils/store/atom";
import { useAtomValue } from 'jotai';


export default function Navbar()
{
    let userValue = localStorage.getItem("user");
    console.log("user -",userValue);

    let items = useSelector((state) => state.cart); //here state is whole app
    let cart_quantity = useAtomValue(quantityAtom);


    return(<>
      <Flex bg="#2875F1">
        <Box as={Link} to="/" ml={{md:"10rem", base:"4rem"}} my="0.3rem">
          <Image src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png"
                alt='flipkart_logo' w="6rem" mt="0.5rem" h="1.3rem" />
              <Text color="white" as="i" fontSize="xs" display="flex" alignItems="center">
                Explore&nbsp;
                <Box as="span" color="#ECDA14" fontWeight="bold" display="flex">
                  Plus<Image src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png"
                              alt='flipkart_logo' h="0.8rem" />
                </Box>
              </Text>
        </Box>
        <Search />
        {
          userValue ? <ProfileMenu user={userValue} /> : <LoginButton />
        }
        <Box as={Link} display="flex" to="/cart" color="white" my="1rem">
          <i className="fa-solid fa-cart-shopping text-xl font-bold mr-px"></i>
          <Text color="white" fontSize="md" fontWeight="semibold">
            Cart&nbsp;
            {
              items.length > 0 ?
              <span className="bg-red-500 rounded-xl px-2 text-white">
                  {cart_quantity}
              </span>
              : ""
            }
          </Text>
        </Box>
      </Flex>
          </>);
}
