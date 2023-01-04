import {Menu, MenuButton, Portal, MenuItem, MenuList, Button, MenuGroup} from "@chakra-ui/react";

export default function ProfileMenu({user})
{
  let handleLogOut = () =>{
                              localStorage.removeItem("user");
                              window.location.reload();
                          }


  return(<>
                  <Menu>
                    <MenuButton as={Button} fontSize="md" bg="white" color="blue.500"
                                w="8rem" my="0.9rem" borderRadius="0.2rem" h="1.8rem"
                                mx={{md:"3rem", base:"2rem"}} textTransform="capitalize" px="0.2rem"
                                rightIcon={<i className="bi bi-chevron-down text-blue-600"></i>}
                    >
                        {user.replace(/['"]+/g, '')}
                    </MenuButton>
                    <Portal>
                      <MenuList>
                        <MenuGroup title='Profile'>
                        <MenuItem color="blue.500" fontSize="md" fontWeight="semibold"
                                  onClick={handleLogOut} className="text-lg"
                        >
                          <i className="ri-shut-down-line px-2 "></i> Logout
                        </MenuItem>
                      </MenuGroup>
                      </MenuList>
                    </Portal>
                  </Menu>
        </>);
}
