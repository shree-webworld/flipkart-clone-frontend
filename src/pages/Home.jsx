import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import { HStack, Box, Hide } from '@chakra-ui/react';
import Banner from '../components/Banner';
import Slides from "../components/Slides";
import {useEffect} from "react";
import SlidesWithAd from "../components/SlidesWithAd";
import AdSection from "../components/AdSection";
import ProductLoading from "../components/ProductLoading";
import Footer from "../components/Footer";


import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../utils/store/productSlice';
import { STATUSES } from '../utils/store/productSlice';


export default function Home()
{
  let dispatch = useDispatch();
  let {data : productCard, status} = useSelector((state) => state.product);

  useEffect(()=>{
                    dispatch(fetchProducts());
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);

                if (status === STATUSES.LOADING) {
                                                    return <ProductLoading />;
                                                }

                if (status === STATUSES.ERROR) {
                                                    return <h2>Something went wrong!</h2>;
                                                }




  return(<>
              <Box position="fixed" top="0" w="100%" className="z-50">
                <Navbar/>
              </Box>

              <Hide below = "md">
                <HStack spacing={{sm:"0.5rem", md:"5rem"}} mt="4rem">
                  <Navbar2 />
                </HStack>
              </Hide>

              <Box bg="#F1F2F7" zIndex={-1} mt={{sm:"3.7rem", md:"1.5rem"}}>
                <Banner />
              </Box>

              <SlidesWithAd productCard={productCard} title='Discounts for You' timer={true}/>
              <AdSection />
              <Slides productCard={productCard} title='Suggested Items' timer={false}/>
              <Slides productCard={productCard} title='Top Selection' timer={false}/>
              <Slides productCard={productCard} title='Recommended Items' timer={false}/>

              <Footer />

        </>);
}
