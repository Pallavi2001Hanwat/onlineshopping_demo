import React from 'react';
import { Container, Box, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from './authentication/Login';
import Register from './authentication/Register';

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="work sans" color="black" textAlign="center">
          <b>SHOPPING-CART</b>
        </Text>
      </Box>

      <Box bg="white" w="100%" m="40px 0 15px 0" color="black" borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList marginBottom="1em">
            <Tab style={{ width: '282px' }} _selected={{ color: 'white', bg: '#D2042D' }}>
              Login
            </Tab>
            <Tab style={{ width: '282px' }} _selected={{ color: 'white', bg: '#D2042D' }}>
              SignUp
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
