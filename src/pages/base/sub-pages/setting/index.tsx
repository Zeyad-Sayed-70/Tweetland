import { FormControl, InputLabel, MenuItem, Select, Switch, Typography, Box, Stack, Icon} from '@mui/material'
import { useGeneralContext } from '../../../../generalContext'
import { useThemeContext } from '../../../../styles/themeContext'
import { SettingProvider } from './style'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useTranslation } from 'react-i18next';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Setting = () => {
  const { themeMode, setThemeMode } = useThemeContext();
  const { lang, setLang } = useGeneralContext();
  const { t } = useTranslation();
  const onChangeTheme = (e, ch) => {
    setThemeMode(ch ? 'dark' : 'light');

    // add dark class to body based on current theme 
    if ( ch )
      document.body.classList.add('dark');
    else
      document.body.classList.remove('dark');
  }
  const onChangeLang = (e) => {
    setLang(e.target.value);

    if ( e.target.value === 'ar' )
      document.body.classList.add('rtl');
    else
      document.body.classList.remove('rtl');
  }
  return (
    <>
    <SettingProvider>
      <Stack className='main-header' direction='row' alignItems='center' justifyContent='space-between' sx={{ p: 2 }}>
        <Typography fontSize={20} fontWeight={600} textTransform='capitalize'>{t('pages.setting.header')}</Typography>
        <Icon><SettingsSuggestIcon sx={{ color: '#179cf0' }}/></Icon>
      </Stack>
      <Box className='cont'> 
        <Box className='col' sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>{t('pages.setting.darkMode')}:</Typography>
          <Switch {...label} size={'medium'} defaultChecked={themeMode === 'dark'} onChange={onChangeTheme} />
        </Box>
        <Box className='col'>
        <FormControl 
          fullWidth
          sx={{ borderColor: 'red' }}
          >
          <InputLabel id="demo-simple-select-label">{t('pages.setting.lngTitle')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lang}
            label="languages"
            onChange={onChangeLang}
            >
            <MenuItem value={'en'}>{t('pages.setting.langs.en')}</MenuItem>
            <MenuItem value={'ar'}>{t('pages.setting.langs.ar')}</MenuItem>
          </Select>
        </FormControl>
        </Box>
      </Box>
    </SettingProvider>
    </>
  )
}

export default Setting