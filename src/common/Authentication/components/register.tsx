import { Button, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, FormLabel, IconButton, InputBase, Select, Typography } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { MAX_STEPS, _DAYS, _MONTHS, _YEARS } from '../../../constants/register'
import { RegisterProvider } from './style/register'
import { createAccount } from '../../../@redux-toolkit/Slices/Authentication/slice'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../../@redux-toolkit/storeConfiguration'
import { useSelector } from 'react-redux'
import { register_func } from './utils'
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next'

const Register = ({ setIsLogin, handleClose }) => {
  const { userData, errorData, isError, isLoading } = useSelector((state: RootState) => state.auth ) 
  const dispatch = useDispatch<AppDispatch>();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
  const [ getCookie, setCookie ] = useCookies();
  const { t } = useTranslation();
  const onSubmit = () => {
    let data: any = {};
    let timp: Object = {};
    formData.forEach((f: Object) => {
      data = {...timp, ...f}
      timp = data;
    })
    
    data = {...data, birth: `${data.year}/${data.month}/${data.day}`}
    dispatch(createAccount(data));
  }

  useEffect(() => {
    if ( !userData?.userData ) return;

    register_func(userData, setCookie);
  }, [userData, errorData])
  
  return (
    <>
    <RegisterProvider>
      <Box className='content' sx={{ width: {xs: '100%', sm: '500px'} }}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <DialogTitle>{t('commons.authentication.dialog.register.header')}</DialogTitle>
          <Box display='flex' alignItems='center'>
            <DialogTitle>{t('commons.authentication.dialog.register.step')} {step+1}/{MAX_STEPS}</DialogTitle>
            <Typography sx={{ fontSize: '12px', color: '#d6362a' }}>{errorData?.data && errorData?.data?.message}</Typography>
            <DialogTitle>
              <IconButton className='close' onClick={handleClose}>x</IconButton>
            </DialogTitle>
          </Box>
        </Box>
        {[<StepOne formData={formData} setFormData={setFormData} step={step} setStep={setStep} />, 
        <StepTwo formData={formData} setFormData={setFormData} step={step} setStep={setStep}/>, 
        <StepThree formData={formData} setFormData={setFormData} step={step} setStep={setStep} onSubmit={onSubmit}/>
        ][step]}

        <DialogActions>
          <Button onClick={() => setIsLogin(true)} sx={{ flex: 1 }}>{t('commons.authentication.dialog.register.backToLogin')}</Button>
        </DialogActions>
      </Box>
    </RegisterProvider>
    </>
  )
}

const StepOne = ({ formData, setFormData, step, setStep }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [birth, setBirth] = useState({year: '', month: '', day: ''});
  const { t } = useTranslation();
  const onNext = (data) => {
    setStep(step+1)
    setFormData((prev) => {
      let newArr: any[] = [];
      if ( prev[1] ) newArr[1] = prev[1];
      if ( prev[2] ) newArr[2] = prev[2];
      newArr[0] = data;
      return newArr;
    })
  }
  return (
  <DialogContent>
    <form onSubmit={handleSubmit(onNext)}>
      <FormGroup sx={{ display: 'flex', gap: 2 }}>
        <FormControl>
          <FormLabel>{t('commons.authentication.dialog.register.username')}</FormLabel>
          <InputBase type='text' {...register('username', { required: t('commons.authentication.dialog.errFieldRequiredMsg') as string })} sx={{ border: '1px solid #ccc', borderRadius: 2, px: 1, py: 1 }}/>
          <span style={{ fontSize: '12px', color: '#d6362a' }}>{errors?.username?.message && errors.username.message as string}</span>
        </FormControl>
        <FormControl>
          <FormLabel>{t('commons.authentication.dialog.register.email')}</FormLabel>
          <InputBase type='email' {...register('email', { required: t('commons.authentication.dialog.errFieldRequiredMsg') as string })} sx={{ border: '1px solid #ccc', borderRadius: 2, px: 1, py: 1 }}/>
          <span style={{ fontSize: '12px', color: '#d6362a' }}>{errors?.email?.message && errors.email.message as string}</span>
        </FormControl>
        <FormLabel>{t('commons.authentication.dialog.register.date.header')}</FormLabel>
        <Box display='flex' gap={1}>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel>{t('commons.authentication.dialog.register.date.year')}</FormLabel>
            <Select 
              id="demo-sample-select"
              value={birth.year}
              {...register('year', { required: true })}
              onChange={(e) => setBirth({...birth, year: e.target.value})}
              >
              {_YEARS.map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel>{t('commons.authentication.dialog.register.date.month')}</FormLabel>
            <Select 
              value={birth.month}
              {...register('month', { required: true })}
              onChange={(e) => setBirth({...birth, month: e.target.value})}
              >
              {_MONTHS.map(m => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <FormLabel>{t('commons.authentication.dialog.register.date.day')}</FormLabel>
            <Select 
              value={birth.day}
              {...register('day', { required: true })}
              onChange={(e) => setBirth({...birth, day: e.target.value})}
              >
              {_DAYS.map(d => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </FormGroup>
      <DialogActions>
          <Button onClick={() => setStep(step-1)} disabled={step === 0} sx={{flex: 1}}>back</Button>
          <Button type='submit' disabled={step === MAX_STEPS-1} sx={{flex: 1}} variant='contained'>{t('commons.authentication.dialog.register.nextBtn')}</Button>
          {/* {step !== MAX_STEPS-1 ? <Button type='submit' onClick={() => setStep(step+1)} disabled={step === MAX_STEPS-1} sx={{flex: 1}} variant='contained'>next</Button>
          : <Button onClick={() => {}} sx={{flex: 1}} variant='contained'>Submit</Button>} */}
      </DialogActions>
    </form>
  </DialogContent>
  )
}

const StepTwo = ({ setStep, step, formData, setFormData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { t } = useTranslation();
  const onNext = (data) => {
    if ( data.password !== data.confirmPassword ) return;

    setStep(step+1)
    setFormData((prev) => {
      let newArr: any[] = [];
      if ( prev[0] ) newArr[0] = prev[0];
      if ( prev[2] ) newArr[2] = prev[2];
      newArr[1] = data;
      return newArr;
    })
  }
  return (
  <DialogContent>
    <form onSubmit={handleSubmit(onNext)}>
      <FormGroup sx={{ display: 'flex', gap: 2 }}>
        <FormControl>
          <FormLabel>{t('commons.authentication.dialog.pass')}</FormLabel>
          <InputBase type='password' {...register('password', { required: t('commons.authentication.dialog.errFieldRequiredMsg') as string })} sx={{ border: '1px solid #ccc', borderRadius: 2, px: 1, py: 1 }}/>
          <span style={{ fontSize: '12px', color: '#d6362a' }}>{errors?.password?.message && errors.password.message as string}</span>
        </FormControl>
        <FormControl>
          <FormLabel>{t('commons.authentication.dialog.register.confPass')}</FormLabel>
          <InputBase type='password' {...register('confirmPassword', { required: t('commons.authentication.dialog.errFieldRequiredMsg') as string })} sx={{ border: '1px solid #ccc', borderRadius: 2, px: 1, py: 1 }}/>
          <span style={{ fontSize: '12px', color: '#d6362a' }}>{errors?.confirmPassword?.message && errors.confirmPassword.message as string}</span>
        </FormControl>
      </FormGroup>
      <DialogActions>
          <Button onClick={() => setStep(step-1)} disabled={step === 0} sx={{flex: 1}}>{t('commons.authentication.dialog.register.backBtn')}</Button>
          <Button type='submit' disabled={step === MAX_STEPS-1} sx={{flex: 1}} variant='contained'>{t('commons.authentication.dialog.register.nextBtn')}</Button>
      </DialogActions>
    </form>
  </DialogContent>
  )
}

const StepThree = ({ setStep, step, formData, setFormData, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { t } = useTranslation();
  const onNext = (data) => {
    setFormData((prev) => {
      let newArr: any[] = [];
      if ( prev[0] ) newArr[0] = prev[0];
      if ( prev[1] ) newArr[1] = prev[1];
      newArr[2] = data;
      return newArr;
    })
  }
  useEffect(() => {
    if ( formData.length === 3 )
      onSubmit();
  }, [formData])
  return (
  <DialogContent>
    <form onSubmit={handleSubmit(onNext)}>
      <FormGroup sx={{ display: 'flex', gap: 2 }}>
        <FormControl>
          <FormLabel>{t('commons.authentication.dialog.register.tagName')}</FormLabel>
          <InputBase type='text' {...register('tagName', { required: "This Field is Required!" })} placeholder='ex: @kivin_doon127' sx={{ border: '1px solid #ccc', borderRadius: 2, px: 1, py: 1 }}/>
          <span style={{ fontSize: '12px', color: '#d6362a' }}>{errors?.tagName?.message && errors.tagName.message as string}</span>
        </FormControl>
      </FormGroup>
      <DialogActions>
          <Button onClick={() => setStep(step-1)} disabled={step === 0} sx={{flex: 1}}>{t('commons.authentication.dialog.register.backBtn')}</Button>
          <Button type='submit' sx={{flex: 1}} variant='contained'>{t('commons.authentication.dialog.register.submit')}</Button>
      </DialogActions>
    </form>
  </DialogContent>
  )
}

export default Register