import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from '@chakra-ui/react';

import axios from 'axios';


const Register = () => {

  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  const handleShowClick = () => {
    setShow(!show);
  };

  const handleShowConfirmClick = () => {
    setShowConfirm(!showConfirm);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };


  const resetForm = () => {
    setName(null);
    setEmail(null);
    setPassword(null);
    setConfirmPassword(null);
    setShow(false);
    setShowConfirm(false);
  };



  const submitHandler = async (e) => {
   
    debugger


    if (!name || !email || !password || ConfirmPassword === '') {
      showToast('Please fill in all the fields', 'warning');

      return;
    }

    if (password !== ConfirmPassword) {
      showToast('Passwords do not match', 'warning');

      return;
    }

    try {
      const data = await axios.post('http://localhost:8080/api/user', { name, email, password });

      if (data != null) {
        resetForm(); 
        showToast('Data successfully saved', 'success');



      }
    } catch (error) {
      console.error('Error during axios.post:', error);

      toast({
        title: 'Error occurred',
        status: 'error',
        duration: 5000,
        description: error.response ? error.response.data.message : 'Unknown error',
        isClosable: true,
        position: 'bottom',
      });

    }
  };

  const showToast = (title, status) => {
    toast({
      title: title,
      status: status,
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter Your Name" onChange={handleOnChange} name="name" value={name || ''} />
      </FormControl>
  
      <FormControl id="Email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email"
          onChange={handleOnChange}
          name="email"
          value={email || ''}
        />
      </FormControl>
  
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Password"
            onChange={handleOnChange}
            name="password"
            value={password || ''}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
  
      <FormControl id="Confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Enter Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            value={ConfirmPassword || ''}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleShowConfirmClick}>
              {showConfirm ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
  
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15, backgroundColor: '#D2042D', color: 'white' }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
  
};

export default Register;
