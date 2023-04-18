import { Avatar, Box, Button, IconButton, InputBase, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { CreateTweetProvider } from './style'

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import { useState } from 'react';
import CTweetDialog from './components/dialog';

const CreateTweet = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const handleOpen = () => {
    setOpen(true);
  }
  return (
    <CreateTweetProvider>
        <CTweetDialog 
          open={open} 
          setOpen={setOpen}
          text={text}
          setText={setText}
        />
        <Box display="flex" gap={1}>
            <Avatar sx={{ width: 50, height: 50 }}/>
            <Stack flex={1}>
                <InputBase type='text' value={text} sx={{ px: 1 }} placeholder={t('commons.createTweet.placeholder') as string} onChange={(e) => setText(e.target.value)} />
                <Box display="flex" alignItems="center" justifyContent='space-between' gap={1}>
                    <Stack direction='row' alignItems='center'>
                        <IconButton onClick={handleOpen}><ImageOutlinedIcon sx={{ color: '#179cf0' }} /></IconButton>
                        <IconButton onClick={handleOpen}><GifBoxOutlinedIcon sx={{ color: '#179cf0' }} /></IconButton>
                        <IconButton onClick={handleOpen}><InsertChartOutlinedIcon sx={{ color: '#179cf0' }} /></IconButton>
                        <IconButton><SentimentSatisfiedAltOutlinedIcon sx={{ color: '#179cf0' }} /></IconButton>
                    </Stack>
                    <Button variant='contained' sx={{ backgroundColor: '#179cf0', borderRadius: 10, px: 2, fontWeight: 600, textTransform: 'capitalize', fontSize: 16, display: {xs: 'none', md: 'flex' }}} onClick={() => setOpen(true)}>{t(`commons.navigation.tweetBtn`)}</Button>
                </Box>
            </Stack>
        </Box>
    </CreateTweetProvider>
  )
}

export default CreateTweet