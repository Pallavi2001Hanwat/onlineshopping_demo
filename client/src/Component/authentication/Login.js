import React, { useState } from 'react';
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    debugger
    const { email, password } = formData;

    if (!email || !password) {
      showToast('Please fill in all the fields', 'warning');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/user/login', formData);
      //console.log(response.data.UserId)
      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('UserId',response.data.UserId)
        showToast('Login successful', 'success');
        navigate('/product ');



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
      <FormControl id="Email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Enter Your Email" onChange={handleOnChange} name="email" />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            onChange={handleOnChange}
            name="password"
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button className='button' width="100%" style={{ marginTop: 15, backgroundColor: '#D2042D', color: 'white' }} onClick={submitHandler}>
  Login
</Button>

    </VStack>
  );
};

export default Login;
