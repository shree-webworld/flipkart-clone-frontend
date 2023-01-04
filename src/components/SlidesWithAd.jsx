import { Box, Image } from '@chakra-ui/react';
import Slides from "./Slides";

export default function SlidesWithAd({productCard, title, timer})
{
  return(<>
            <Box display="flex">
              <Box w={{sm:"75%",md:"82%"}}>
                <Slides productCard={productCard} title={title} timer={timer}/>
              </Box>

              <Box bg="white" px="0.4rem" py="0.3rem" >
                <Image src="https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70"
                        alt="Ad" h={{sm:"26.5rem", md:"24.8rem"}}/>
              </Box>
            </Box>



        </>);
}
