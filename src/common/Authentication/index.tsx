import { Typography, Box, Stack, Button, Dialog, DialogContent, DialogTitle, FormControl, FormLabel, InputBase, FormGroup } from '@mui/material'
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import AuthDialog from './components/dialog';
import { AuthProvider } from './style';

const Authentication = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const handleLoginClick = () => {
    setOpen(true)
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