// Register.tsx
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
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks.ts';
import { register } from '../slices/authSlice.ts';

interface IFormInput {
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);
  const { control, handleSubmit } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    await dispatch(register(data));
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
          Register
        </Typography>
        {error && (
          <Typography color='error'>{JSON.stringify(error)}</Typography>
        )}
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
            Register
          </Button>
        </form>
        <Typography variant='body2' component='p' marginTop='1rem'>
          Already have an account?{' '}
          <Link component={RouterLink} to='/login'>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
