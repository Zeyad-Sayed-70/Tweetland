import { Box, Button, DialogContent, DialogTitle, FormControl, FormGroup, FormLabel, IconButton, InputBase, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginProvider } from './style/login';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../@redux-toolkit/storeConfiguration'
import { login } from '../../../@redux-toolkit/Slices/Authentication/slice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const LoginSchema = yup.object({
  name: yup.string() 
})

export interface REQUEST_DATA {
  password: string,
  email?: string,
  username?: string
}

const Login = ({ setIsLogin, handleClose }) => {
  const { userData, errorData, isLoading, isSuccess, isError } = useSelector((state: RootState) => state.auth)
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const disptach = useDispatch<AppDispatch>()
  const [errMessage, setErrMessage] = useState<string>('')

  useEffect(() => {
    if ( isError ) {
      return setErrMessage(errorData?.message);
    }
    if ( isLoading || !isSuccess ) return;
    // clear error message
    setErrMessage('');

    // store auth token
    localStorage.setItem('token', userData.token);

    // reload page after 500ms
    setTimeout(() => {
      window.location.reload();
    }, 500)

  }, [userData, errorData, isLoading, isSuccess, isError])

  const onSubmit = (data) => {
    let request_data: REQUEST_DATA = { password: data.password }
    
    if ( data.uoe.includes('@') )
      request_data.email = data.uoe;
    else
      request_data.username = data.uoe;
      
    disptach(login(request_data))
  }
  
  return (
  <>
  <LoginProvider>
    <Box className='login' display='flex' justifyContent='space-between' alignItems='center' sx={{ width: {xs: '100%', sm: '500px'}}}>
    <DialogTitle>
      {t('commons.authentication.dialog.login.header')}
    </DialogTitle>
    <DialogTitle>
      <IconButton sx={{width: '40px', height: '40px'}} className='close' onClick={handleClose}>x</IconButton>
    </DialogTitle>
    </Box>
      <DialogContent className='content'>
        {errMessage && <Typography className='error' sx={{ fontSize: '18px !important', mb: 2, textAlign: 'center' }}>{errMessage}</Typography>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup sx={{ display: 'flex', gap: 2 }}>
            <FormControl>
              <FormLabel sx={{ mb: 1 }}>{t('commons.authentication.dialog.login.eou')}</FormLabel>
              <InputBase type='text' {...register("uoe", { required: t('commons.authentication.dialog.errFieldRequiredMsg') as string })} sx={{ border: '1px solid', borderRadius: 2, px: 1, py: 1 }}/>
              <span className='error'>{errors?.uoe?.message && errors.uoe.message as string}</span>
            </FormControl>
            <FormControl>
              <FormLabel sx={{ mb: 1 }}>{t('commons.authentication.dialog.pass')}</FormLabel>
              <InputBase type='password' {...register("password", { required: t('commons.authentication.dialog.errFieldRequiredMsg') as string })} sx={{ border: '1px solid', borderRadius: 2, px: 1, py: 1 }}/>
              <span className='error'>{errors?.password?.message && errors.password.message as string}</span>
            </FormControl>
            <Button type='submit' variant='contained'>{t('commons.authentication.dialog.loginBtn')}</Button>
          </FormGroup>
        </form>
        <Button onClick={() => setIsLogin(false)} variant='contained' color='success' fullWidth sx={{ mt: 1 }}>{t('commons.authentication.dialog.registerBtn')}</Button>
        <Button fullWidth sx={{ mt: 1 }}>{t('commons.authentication.dialog.login.forgetPass')}</Button>
        <Typography width={300} fontSize={14}>{t('commons.authentication.requirments')}</Typography>
      </DialogContent>
    </LoginProvider>
    </>
  )
}

export default Login