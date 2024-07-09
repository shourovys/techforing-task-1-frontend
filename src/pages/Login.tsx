import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    await login(data.email, data.password);
  };

  return (
    <Container maxWidth='xs'>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Typography variant='h5' component='h1' gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                label='Email'
                type='email'
                fullWidth
                required
                size='small'
                margin='normal'
                {...field}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                label='Password'
                type='password'
                fullWidth
                required
                size='small'
                margin='normal'
                {...field}
              />
            )}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            style={{ marginTop: '.5rem' }}
          >
            Login
          </Button>
        </form>
        <Typography variant='body2' component='p' marginTop='1rem'>
          Don't have an account?{' '}
          <Link component={RouterLink} to='/register'>
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
