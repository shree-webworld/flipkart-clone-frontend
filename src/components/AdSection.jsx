import { Image, SimpleGrid } from '@chakra-ui/react';



const ImageURL = [
    'https://rukminim1.flixcart.com/flap/960/960/image/2f30db9425df5cec.jpg?q=50',
    'https://rukminim1.flixcart.com/flap/960/960/image/084789479074d2b2.jpg',
    'https://rukminim1.flixcart.com/flap/960/960/image/1ce0c4c1fb501b45.jpg?q=50'
];


export default function AdSection()
{
  return(<>
            <SimpleGrid columns={{sm: 1, md: 3}} spacing={1} mx="0.5rem">
              {
                ImageURL.map((image, index)=>(
                                                <Image src={image} alt="ad" key={index}/>
                                             )
                            )
              }
            </SimpleGrid>
            <Image src="https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50"
                    objectFit='cover'  alt="covid-ad" px="0.5rem" my="0.5rem" h={{sm:"8.5rem", md:"15rem"}}/>
        </>);
}
