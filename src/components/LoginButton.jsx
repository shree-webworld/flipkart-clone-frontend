import {Button, useDisclosure, Input, Box, Text, Link, Center, Image, HStack, Heading, useToast} from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react';
import {InputLeftAddon} from '@chakra-ui/react';
import {useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const accountInitialValues = {
    login: {
        view: 'login',
        heading: 'Login',
        subHeading: 'Get access to your Orders, Wishlist and Recommendations'
    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here",
        subHeading: 'Signup to get started'
    }
}

export default function LoginButton()
{
      const base_url = import.meta.env.VITE_BASE_URL;
      const [ login, setLogin ] = useState(loginInitialValues);
      const [ signup, setSignup ] = useState(signupInitialValues);
      const [ error, showError] = useState(false);
      const [ account, toggleAccount ] = useState(accountInitialValues.login);
      let { isOpen, onOpen, onClose } = useDisclosure();
      const { register, handleSubmit, reset, formState: { errors } } = useForm({mode: "all"});
      // console.log("errors",errors);

      const toast = useToast();
      let [showPassword, setShowPassword] = useState(false);
      let handlePasswordIcon = () => setShowPassword(!showPassword) ;

      const toggleSignup = () => {
                                    toggleAccount(accountInitialValues.signup);
                                    reset();
                                 }

    let onHandleClose = () => {
                                   toggleAccount(accountInitialValues.login);
                                   reset();
                                   onClose();
                                 }


      let onLoginSubmit = async (signindata) => {
                                try
                                {
                                   let {email, password} = signindata;
                                   let result = await axios.post(`${base_url}/api/signin`,{email, password});
                                   // console.log("name - ",result.data.name);
                                   localStorage.setItem("user",JSON.stringify(result.data.name));

                                   if(result.status === 200)
                                   {
                                     reset();
                                     onHandleClose();
                                     window.location.reload();
                                   toast({
                                     title: 'Login successfully',
                                     description: "Happy Shopping!!",
                                     status: 'success',
                                     duration: 4000,
                                     position: "top",
                                     isClosable: true,
                                   });
                                 }
                                }catch (e)
                                 {
                                    console.log(e);
                                    toast({
                                      title: 'Login error',
                                      description: "Invalid Credentials!!",
                                      status: 'error',
                                      duration: 4000,
                                      position: "top",
                                      isClosable: true,
                                    });

                                 }
                   }





      let onSignupSubmit = async (signupdata) => {
                                    try
                                    {
                                      let {signup_name, signup_email, signup_password, contact_number} = signupdata;

                                      let result = await axios.post(`${base_url}/api/signup`,{name:signup_name, email:signup_email, password:signup_password, contact_number});
                                      console.log("signup ", result);
                                      localStorage.setItem("user",JSON.stringify(result.data.name));

                                      if(!result)
                                        return;
                                      else
                                      {
                                          reset();
                                          onHandleClose();
                                          window.location.reload();

                                          toast({
                                            title: 'Signup successfully',
                                            description: "Happy Shopping!!",
                                            status: 'success',
                                            duration: 4000,
                                            position: "top",
                                            isClosable: true,
                                          });
                                      }
                                    }catch (e)
                                      {
                                          console.log(e);
                                          toast({
                                            title: 'Signup error',
                                            description: "Please, signup again!!",
                                            status: 'error',
                                            duration: 4000,
                                            position: "top",
                                            isClosable: true,
                                          });

                                      }
              }



  return(<>
            <Button bg="white" color="blue.500" w="8.5rem" my="0.9rem" borderRadius="0.2rem" h="1.8rem"
                    mx="3rem" fontSize='1rem' onClick={onOpen}
             >
              Login
            </Button>

               <Modal isOpen={isOpen} onClose={onHandleClose} size="xl">
                    <ModalOverlay />
                    <ModalContent>
                      <ModalBody>
                        <HStack>
                        <Box bg="#2975F0" w="14rem" color="white" borderRadius="md">
                          <Heading size="lg" mt="2rem" ml="0.4rem">
                            {account.heading}
                          </Heading>
                          <Text noOfLines={3} mt="2rem" mb="10rem" ml="0.4rem">
                            {account.subHeading}
                          </Text>
                          <Image src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png'
                                   alt='Login'  mt="10rem"/>
                        </Box>
                        { account.view === 'login' ?
                        <Box w="18rem">
                         <form onSubmit={handleSubmit(onLoginSubmit)}>
                          <FormControl isRequired mt="0.5rem" isInvalid={errors.email}>
                            <FormLabel fontSize="sm" ml="0.5rem" htmlFor="email">
                              Email :
                            </FormLabel>

                            <Input type="email" id="email" name="email" placeholder='Enter email'
                                    variant='outline'
                                    {...register("email",{
                                                            required: true,
                                                            pattern: {
                                                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                        message: "Email must be valid",
                                                                     },
                                                         }
                                                )
                                    }
                                    autoComplete="off"  focusBorderColor='blue.500' w="19rem" size="md"/>
                                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                          </FormControl>

                          <FormControl isRequired mt="1rem" isInvalid={errors.password}>
                            <FormLabel fontSize="sm" ml="0.5rem" htmlFor="password">
                              Password :
                            </FormLabel>

                            <InputGroup w="19rem">
                             <Input placeholder="Enter password" id="password" variant='outline' focusBorderColor='blue.500'
                                     type={showPassword ? 'text' : 'password'}
                                     name="password" {...register("password",{
                                                                                required: "Password is required...",
                                                                             }
                                                                  )
                                                     }
                                     autoComplete="off" size="md"
                              />
                              <InputRightElement>
                                  <Button  size='sm' onClick={handlePasswordIcon} bg="white" color="blue.500">
                                     {showPassword ? <i className="zmdi zmdi-eye-off"></i> : <i className="zmdi zmdi-eye"></i>}
                                  </Button>
                               </InputRightElement>
                             </InputGroup>
                             <FormErrorMessage>
                               {errors.password?.message}
                             </FormErrorMessage>
                        </FormControl>

                          <Text fontSize="xs" mt="0.5rem" pl="0.5rem">
                            By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.
                          </Text>
                          <Button bg="#FA651B" color="white" borderRadius="0.1rem" w="19rem" type="submit"
                                  _hover={{background:"orange.400"}}  mt="2rem" mb="1rem">
                            Login
                          </Button>
                        </form>
                          <Center>
                            <Text fontSize="md" color="gray.500">
                                OR
                            </Text>
                          </Center>
                          <Button bg="white" color="blue.500" boxShadow='dark-lg' borderRadius="0.1rem" my="1rem" w="19rem">
                            Request OTP
                          </Button>
                          <Button variant='link' onClick={() => toggleSignup()} mx="1.5rem" my="1.5rem" color="blue.500">
                              New to Flipkart? Create an account
                          </Button>
                        </Box>
                            :
                           <Box w="18rem">
                           <form onSubmit={handleSubmit(onSignupSubmit)}>
                            <FormControl isRequired  mt="0.5rem" isInvalid={errors.signup_name}>
                              <FormLabel fontSize="sm" ml="0.5rem"  htmlFor="signup_name">
                                Name :
                              </FormLabel>
                              <Input type="text" id="signup_name" placeholder="Enter name" variant='outline'
                                     focusBorderColor='blue.500' w="19rem" size="md"
                                     name="signup_name" autoComplete="off"
                                     {...register("signup_name",{
                                                                  required: true,
                                                                  minLength: {
                                                                                value: 3,
                                                                                message: "Name must be atleast 3 characters long..."
                                                                              },
                                                                  maxLength: {
                                                                                value: 30,
                                                                                message: "Name must be atmost 30 characters long...",
                                                                            },
                                                                  pattern: {
                                                                              value: /^[a-zA-Z][a-zA-Z ]*$/,
                                                                              message: "Only alphabets and spaces, no special characters or numbers are allowed.",
                                                                           }
                                                                }
                                                  )
                                     }
                              />
                              <FormErrorMessage ml="0.5rem">{errors.signup_name?.message}</FormErrorMessage>
                            </FormControl>

                            <FormControl isRequired  mt="1rem" isInvalid={errors.signup_email}>
                              <FormLabel fontSize="sm" ml="0.5rem" htmlFor="signup_email">
                                Email :
                              </FormLabel>
                              <Input type="email" id="signup_email" placeholder="Enter email"
                                    variant='outline' focusBorderColor='blue.500'
                                    name="signup_email" autoComplete="off" w="19rem" size="md"
                                    {...register("signup_email",{
                                                            required: true,
                                                            pattern: {
                                                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                        message: "Email must be valid",
                                                                     },
                                                         }
                                                )
                                    }

                               />
                             <FormErrorMessage ml="0.5rem">{errors.signup_email?.message}</FormErrorMessage>
                             </FormControl>


                             <FormControl isRequired  mt="1rem" isInvalid={errors.signup_password}>
                               <FormLabel fontSize="sm" ml="0.5rem" htmlFor="signup_password">
                                 Password :
                               </FormLabel>

                               <InputGroup w="19rem">
                                <Input placeholder="Enter password" id="signup_password" variant='outline'
                                        focusBorderColor='blue.500' type={showPassword ? 'text' : 'password'}
                                        name="signup_password" autoComplete="off" size="md"
                                         {...register("signup_password",{
                                                                           required: true,
                                                                           pattern: {
                                                                                       value: /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                                                                                       message: "Password Must Contain Atleast 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
                                                                                    },
                                                                        }
                                                                     )
                                                        }

                                 />
                                 <InputRightElement>
                                     <Button  size='sm' onClick={handlePasswordIcon} bg="white" color="blue.500">
                                        {showPassword ? <i className="zmdi zmdi-eye-off"></i> : <i className="zmdi zmdi-eye"></i>}
                                     </Button>
                                  </InputRightElement>
                                </InputGroup>

                                <FormErrorMessage ml="0.5rem">{errors.signup_password?.message}</FormErrorMessage>
                              </FormControl>


                          <FormControl isRequired mt="1rem" isInvalid={errors.contact_number}>
                            <FormLabel fontSize="sm" ml="0.5rem" htmlFor="contact_number">
                              Contact number :
                            </FormLabel>

                            <InputGroup w="19rem">
                              <InputLeftAddon children="+91" bg="blue.500" color="white"/>
                              <Input type="number" id="contact_number" placeholder="Enter contact number"
                                     variant='outline' focusBorderColor='blue.500' name="contact_number"
                                     w="19rem" size="md" autoComplete="off"
                                     {...register("contact_number",{
                                                                     required: true,
                                                                     maxLength: {
                                                                                   value: 10,
                                                                                   message: "Contact number must be 10 digit long...",
                                                                               }

                                                                   }
                                                 )
                                     }
                              />
                             </InputGroup>

                            <FormErrorMessage ml="0.5rem">{errors.contact_number?.message}</FormErrorMessage>
                          </FormControl>


                              <Button bg="#FA651B" color="white" borderRadius="0.1rem" w="19rem" type="submit"
                                      _hover={{background:"orange.400"}}  my="1.5rem">
                                Signup
                              </Button>
                            </form>
                           </Box>
                        }
                      </HStack>
                      </ModalBody>
                    </ModalContent>
                </Modal>
        </>);
}
