import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Stack, Heading, Image, Text } from '@chakra-ui/react';
import {Box, Center, VStack} from "@chakra-ui/react";
import Countdown from 'react-countdown';
import {Link} from "react-router-dom";



export default function Slides({productCard, title, timer})
{
  const responsive =
  {
      desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
      },
      tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
      },
      mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
      }
  };


  const renderer = ({ hours, minutes, seconds }) => {
          return <Box color="#7f7f7f">{hours} : {minutes} : {seconds}  Left</Box>;
      };


  return(<>
          <Box bg="#F1F2F4" py="0.6rem">
          <Box bg="white" py="0.7rem" boxShadow="md" mx="0.5rem">
            <Box display="flex" mx="2rem">
              <Heading size="md">{title}</Heading>
               {
                  timer && (<>
                     <Image src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg'
                            objectFit='cover' boxSize="1.6rem" alt='timer' ml="1.5rem" mr="0.5rem"/>
                     <Countdown date={Date.now() + 5.04e+7} renderer={renderer}/>
                          </>)
               }
              <Button variant='solid' colorScheme='messenger' ml="auto" borderRadius="0.2rem">View All</Button>
            </Box>
            <Divider orientation='horizontal' my="0.7rem"/>
            <Carousel
                    swipeable={false}
                    draggable={false}
                    responsive={responsive}
                    centerMode={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={10000}
                    keyBoardControl={true}
                    showDots={false}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
            >
          {
            productCard.map((product)=>(
              <Link to={`product/${product.id}`} key={product.id}>
              <Card maxW='sm' mt="1rem" bg="white">
                <CardBody>
                 <Center>
                  <Image
                    src={product.url}
                    alt={product.title.shortTitle}
                    boxSize="8.5rem"
                    borderRadius='lg'
                  />
                </Center>
                <VStack spacing="0.4rem" mt="1rem">
                  <Heading size='sm' textAlign="center" >
                    {product.title.shortTitle}
                  </Heading>
                  <Text fontSize='md' textAlign="center" color="green.600">
                    {product.discount}
                  </Text>
                  <Text fontSize='md' textAlign="center" color="gray.600">
                    {product.tagline}
                  </Text>
                </VStack>
                </CardBody>
              </Card>
            </Link>
        )
      )
  }
        </Carousel>
      </Box>
    </Box>
        </>);
}
