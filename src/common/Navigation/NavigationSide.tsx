import { Box, Button, Stack, Icon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import { navigationList } from '../../constants/navigationList';
import { useGeneralContext } from '../../generalContext';
import { NavigationProvider } from './style/navigation';

const NavigationSide = () => {
  const { me, isLogging } = useGeneralContext();
  const { t } = useTranslation();
  const location = useLocation();
  const [selected, setSelected] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleClick = (ind: number, href: string) => {
    if (href === '/profile') {
      if (!me?._id) return;
      navigate(`${href}/${me.tagName}`);
      setSelected(ind);
      return;
    }
    navigate(`${href}`);
    setSelected(ind);
  }

  useEffect(() => {
    navigationList.map((e, i) => {
      if (location.pathname.includes(e.link)) {
        setSelected(i)
      }
    })
  }, [location])
  return (
    <NavigationProvider>
      <Box className='logo-box' mb={3}><img style={{ width: '40px' }} src="assets/twitter-logo.png" /></Box>

      <Stack className='ul' gap={1}>
        {navigationList.map((list, ind) => {
          if ((!isLogging && (ind <= 1 || ind === navigationList.length - 1)) || isLogging)
            return (
              <Box
                key={ind}
                className={`${selected === ind ? 'active' : ''} list`}
                px={2} py={1} pl={2}
                display='flex'
                alignItems='center'
                gap={2}
                borderRadius={10}
                onClick={() => handleClick(ind, list.link)}
              >
                <Icon sx={{ width: 'fit-content', height: 23, 'svg': { fontSize: 26 } }}>{list.icon}</Icon>
                <Typography className='title' mt={.65} textTransform='capitalize' fontSize={16} fontWeight={600}>{t(`commons.navigation.lists.${list.title}`)}</Typography>
              </Box>
            )
        })}
      </Stack>
      {isLogging && <Button variant='contained' sx={{ backgroundColor: '#179cf0', borderRadius: 10, px: 5, fontWeight: 600, textTransform: 'capitalize', fontSize: 18, display: { xs: 'none', md: 'flex' }, marginTop: { xs: '0', lg: '2rem' }, width: { lg: '100%' } }}>{t(`commons.navigation.tweetBtn`)}</Button>}
    </NavigationProvider>
  )
}

export default NavigationSide