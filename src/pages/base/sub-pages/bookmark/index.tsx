import { Icon, Stack, Typography, Box, IconButton, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react';
import { BookmarksProvider } from './style';
import TweetInBookmark from './components/tweet';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useTranslation } from 'react-i18next';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Redirect from '../../../../common/Redirect';

const Bookmarks = () => {
  const [tweets, setTweets] = useState([]);
  const { t } = useTranslation();

  const handleDelete = (tweet) => {
    // get old tweets
    const oldTweets = JSON.parse(localStorage.getItem('bookmarks') as string) || [];
    const newTweets = oldTweets.filter(t => t._id !== tweet._id);

    // update tweets state
    setTweets(newTweets);

    // save new tweets
    localStorage.setItem('bookmarks', JSON.stringify(newTweets));
  }

  useEffect(() => {
    const tweetsData = JSON.parse(localStorage.getItem('bookmarks') as string) || [];
    setTweets(tweetsData);
  }, [])
  return (
    <BookmarksProvider>
      <Stack className='main-header' direction='row' alignItems='center' justifyContent='space-between' sx={{ p: 2 }}>
        <Typography fontSize={20} fontWeight={600} textTransform='capitalize'>{t('pages.bookmarks.header')}</Typography>
        <Icon><BookmarkBorderIcon sx={{ color: '#179cf0' }} /></Icon>
      </Stack>

      <Stack gap={1} pt={2}>
        {tweets.length === 0 && <Typography className='notfound'>{t('pages.bookmarks.notFoundMsg')}</Typography>}
        {tweets.map((tweet: any) => (
          <Box key={tweet._id} className='tweet-provider'>
            <Tooltip title={t('pages.bookmarks.deleteTitle')}>
              <IconButton className={'delete'} onClick={() => handleDelete(tweet)}><RemoveCircleOutlineIcon /></IconButton>
            </Tooltip>
            <TweetInBookmark data={tweet} />
          </Box>
        ))}
      </Stack>
    </BookmarksProvider>
  )
}

export default Bookmarks