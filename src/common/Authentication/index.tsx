import { Typography, Box, Stack, Button, Dialog, DialogContent, DialogTitle, FormControl, FormLabel, InputBase, FormGroup } from '@mui/material'
import { useEffect, useId, useState } from 'react';
import { useTranslation } from "react-i18next";
import AuthDialog from './components/dialog';
import { AuthProvider } from './style';
import { generateRandomId } from './components/utils';
import { createAccount } from '../../@redux-toolkit/Slices/Authentication/slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../@redux-toolkit/storeConfiguration';

const Authentication = () => {
  const { userData, errorData, isError, isLoading, isSuccess } = useSelector((state: RootState) => state.auth ) 
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
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

  const handleLoginClick = () => {
    setOpen(true)
  }

  const handleGuestClick = () => {
    const guestData = {
      username: `user-${generateRandomId(1000)}`,
      email: `guest-user-${generateRandomId(1000)}@gmail.com`,
      year: 1970,
      month: 1,
      day: 1,
      password: "guest1212",
      confirmPassword: "guest1212",
      tagName: `@GuestUser-${generateRandomId(1000)}`,
      birth: "1970/1/1"
    }

    dispatch(createAccount(guestData))
  }
  
  return (
    <AuthProvider>
      <Stack className='box' sx={{ border: '1px solid', p: 2, mb: 1, borderRadius: 4, gap: 1 }}>
        <Typography className='header' textTransform='capitalize' fontSize={22} fontWeight={600}>
          {t('commons.authentication.header')}
        </Typography>
        <Typography className='subHeader' textTransform='capitalize' fontSize={14} fontWeight={500}>
          {t('commons.authentication.subHeader')}
        </Typography>
        <Button variant='contained' onClick={handleLoginClick}>{t('commons.authentication.dialog.loginBtn')}</Button>
        <Button variant='contained' onClick={handleGuestClick}>{t('commons.authentication.dialog.guestBtn')}</Button>
        <Typography className='subHeader' textTransform='capitalize' fontSize={14} fontWeight={500}>
          {t('commons.authentication.requirments')}
        </Typography>
      </Stack>
      <Typography className='subHeader' textAlign='center' textTransform='capitalize' fontSize={14} fontWeight={500}>
        {t('commons.authentication.copyrights')}
      </Typography>

      <AuthDialog open={open} setOpen={setOpen}/>
    </AuthProvider>
  )
}

export default Authentication