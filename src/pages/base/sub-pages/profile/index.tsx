import { Avatar, Box, Button, Icon, Stack, Typography } from '@mui/material'
import { ProfileProvider } from './style'
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../@redux-toolkit/storeConfiguration';
import { MutableRefObject, useEffect, useState } from 'react';
import { getTweet } from '../../../../@redux-toolkit/Slices/Tweets/getTweet/slice';
import { useSelector } from 'react-redux';
import Tweet from '../../../../common/Tweets';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getUser } from '../../../../@redux-toolkit/Slices/User/getUser/slice';
import useElementOnScreen from './customHook/intersectionObserve';
import Redirect from '../../../../common/Redirect';
import { useGeneralContext } from '../../../../generalContext';


const Profile = () => {
  const { user: { userData: user }, isLoading } = useSelector((state: RootState) => state.guser);
  const { myTweets: tweets, isLoading: isTweetLoading } = useSelector((state: RootState) => state.gtweet);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token') as string;
  const translate = useTranslation();
  const [ref, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  });

  useEffect(() => {
    // Fetch user data
    const tagName = location.pathname.slice(location.pathname.indexOf("@"));

    if (tagName) {
      dispatch(getUser({ token, tagName }))
    }
  }, [location])

  if (!isLoading && user === undefined) return <>this user is not exist</>

  return (
    <ProfileProvider>
      {/* Redirect to home page if the user is not Logined  */}
      <Redirect />
      <Stack className='main-header' direction='row' alignItems='center' sx={{ px: 1, py: 2, gap: 1 }}>
        <IconButton onClick={() => navigate('/')} className='title'>
          {translate[1].language === 'en' ? <ChevronLeftIcon sx={{ width: 30, height: 30 }} />
          : <KeyboardArrowRightIcon sx={{ width: 30, height: 30 }} />}
        </IconButton>
        <Typography className='title' fontSize={20} fontWeight={600} textTransform='capitalize'>{user?.username}</Typography>
      </Stack>

      <ProfileHead user={user} />

      <DisplayTweets isVisible={isVisible} user={user} />
      <div ref={ref as MutableRefObject<null>}></div>
    </ProfileProvider>
  )
}

const ProfileHead = ({ user }) => {
  const { t } = useTranslation();
  const { me } = useGeneralContext();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }

  return <>
    <Box>
      <Box className='banar'>
        {/* <img src="" alt="" /> */}
      </Box>
      <Stack direction='row' alignItems='center' justifyContent='space-between' px={2}>
        <Avatar sx={{ width: 100, height: 100, mt: -6 }} src="" alt="avatar" />
        <Stack direction='row' align-cnter='center' gap={2}>
          <Button variant='contained'>{t('pages.profile.editBtn')}</Button>
          { me?._id === user?._id && <Button variant='contained' color='error' onClick={handleLogout}>{t('pages.profile.logoutBtn')}</Button>}
        </Stack>
      </Stack>
      <Stack px={2} mt={1}>
        <Typography className='title' fontSize={22} fontWeight={600}>{user?.username}</Typography>
        <Typography className='sub-title' fontSize={16} fontWeight={500}>{user?.tagName}</Typography>
        <Typography className='sub-title' fontSize={16} fontWeight={500}><Icon sx={{ 'svg': { fontSize: 20 } }}><CalendarMonthIcon /></Icon> Joined March 2023</Typography>
        <Stack direction='row' gap={1}>
          <Box display={'flex'} alignItems='center' gap={1}>
            <Typography className='title' fontWeight={600}>1</Typography>
            <Typography>{t('pages.profile.following')}</Typography>
          </Box>
          <Box display={'flex'} alignItems='center' gap={1}>
            <Typography className='title' fontWeight={600}>0</Typography>
            <Typography>{t('pages.profile.followers')}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  </>
}

const DisplayTweets = ({ isVisible, user }) => {
  const { myTweets: tweets, isLoading } = useSelector((state: RootState) => state.gtweet);
  const dispatch = useDispatch<AppDispatch>();
  const [tweetsData, setTweetsData] = useState<any[]>([]);
  const [skipTimes, setSkipTimes] = useState<number>(1);

  const token = localStorage.getItem('token') as string;
  let fetch_once = true;

  useEffect(() => {
    if (!fetch_once || !user?._id) return;
    // Fetch initial tweets
    dispatch(getTweet({ token, SKIP: 0, id: user?._id }));
    fetch_once = false;
  }, [user])

  useEffect(() => {
    if (tweets) {
      const tweets_ids = tweets.map(t => t._id);
      const isFind = tweetsData.some(t => tweets_ids.includes(t._id));
      if (isFind) return;

      setTweetsData(prev => [...prev, ...tweets]);
    }
  }, [tweets])

  useEffect(() => {
    if (!user?._id) return;
    // Fetch extra tweets when sroll down
    if (!isVisible) return;

    dispatch(getTweet({ token, SKIP: skipTimes, id: user._id }));
    if (tweets?.length === 0) return
    setSkipTimes(prev => prev + 1);
  }, [isVisible])

  return <>
    <Stack gap={1} pt={2} my={3}>
      {tweetsData?.filter(tweet => tweet.creator_data._id === user._id)?.map(tweet => (
        <Tweet key={tweet._id} data={tweet} />
      ))}
    </Stack>
    {isLoading && <Typography className='loading'>Loading...</Typography>}
    {(tweets?.length === 0 && !isLoading) && <Typography className='notfound'>Not Found Other Tweets</Typography>}
  </>
}
export default Profile