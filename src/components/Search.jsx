import { Input, InputGroup, InputRightElement, Button, HStack, Image } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import {useSelector, useDispatch} from "react-redux";
import { fetchProducts } from '../utils/store/productSlice';
import {useEffect, useState} from "react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { STATUSES } from '../utils/store/productSlice';
import {Link} from "react-router-dom";


export default function Search()
{
  let [text, setText] = useState();
  let dispatch = useDispatch();
  let {data : items, status} = useSelector((state) => state.product); //here state is whole app
  console.log(items);

  useEffect(()=>{
                    // dispatch(fetchProducts());
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[dispatch]);


                if (status === STATUSES.LOADING) {
                                                    return <h2>LOADING</h2>;
                                                }

                if (status === STATUSES.ERROR) {
                                                    return <h2>Something went wrong!</h2>;
                                                }


  let handleSearch= (searchData) =>{
                                      console.log(searchData);
                                      reset();
                                   }

  let getText = (text) =>{
                              setText(text);
                         }


  return(<>

        <InputGroup size='sm' w={{md:"35rem", base:"10rem"}} my="0.8rem" mx={{md:"2rem", base:"1rem"}}>
          <Input
            pr='4.5rem' type='text' onChange={(e) => getText(e.target.value)}
            placeholder='Search for products, brands and more' bg="white" name="search_product"
            autoComplete="off" position="relative"
          />
        <InputRightElement width='2.5rem'>
            <Button h='1.75rem' size='sm' fontWeight="bold"
                    fontSize="1.2rem" type="submit"
                    bg="white" color="blue.500" _hover={{background:"white"}}
            >
              <i className="bi bi-search"></i>
            </Button>
          </InputRightElement>

        </InputGroup>
        {
          text &&
          <List position="absolute" mt="2.9rem" w={{md:"35rem", sm:"33rem"}}
                ml={{md:"18rem",sm:"2rem"}}  className="bg-blue-50 text-gray-900 z-50 ">
            {
              items.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product =>(
                <ListItem px="1rem" my="0.8rem" display="flex" gap={6}
                          as={Link} to={`/product/${product.id}`} _hover={{bgColor:"blue.400"}}>
                    <Image src={product.url} alt={product.id} boxSize="2rem"/>
                    {product.title.longTitle}
                </ListItem>
              )
            )
          }
        </List>
      }

      </>)
}
