import { Box, Stack, Typography, Icon } from '@mui/material';
import { useEffect, useState } from 'react';
import Tabs from './components/tabs';
import { NotificationProvider } from './style';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../@redux-toolkit/storeConfiguration';
import { useSelector } from 'react-redux';
import { getNotifications } from '../../../../@redux-toolkit/Slices/Notifications/slice';
import { useGeneralContext } from '../../../../generalContext';
import { useTranslation } from 'react-i18next';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Redirect from '../../../../common/Redirect';

const Notification = () => {
  const { notes, isLoading, isSuccess } = useSelector((state: RootState) => state.gnotes);
  const { me } = useGeneralContext();
  const [tab, setTab] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  useEffect(() => {
    if (!me?._id) return;

    const token = localStorage.getItem('token') as string;
    dispatch(getNotifications({ token, id: me._id }))
  }, [me])

  return (
    <NotificationProvider>
      {/* Redirect to home page if the user is not Logined  */}
      <Redirect />
      <Stack className='main-header' direction='row' alignItems='center' justifyContent='space-between' sx={{ p: 2 }}>
        <Typography fontSize={20} fontWeight={600} textTransform='capitalize'>{t('pages.notification.header')}</Typography>
        <Icon><NotificationsNoneIcon sx={{ color: '#179cf0' }} /></Icon>
      </Stack>
      <Tabs tab={tab} setTab={setTab} />

      {tab === 0 && (isLoading ? <Typography className="loading">Loading...</Typography> : <Stack mt={notes.data?.length === 0 ? 0 : 2}>
        {notes.data?.length === 0 && <Typography className="notfound">{t('pages.notification.notFound')}</Typography>}
        {notes.data?.map((note, ind) => (
          <Box key={ind} className="note" display="flex" alignItems='center' gap={2}>
            <Avatar src={note.userData?.avatar || "123"} alt={note.userData.username} />
            <Typography>{note.noteMsg}</Typography>
          </Box>
        ))}
      </Stack>)}

      {tab === 1 && <Typography className="notfound">{t('pages.notification.notFound')}</Typography>}
      {tab === 2 && <Typography className="notfound">{t('pages.notification.notFound')}</Typography>}
    </NotificationProvider>
  )
}

export default Notification