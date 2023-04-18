import { Stack, Typography, Box, IconButton, InputBase, Tooltip } from '@mui/material'
import DirectMessages from './components/directMessages.tsx'
import { MessagesProvider } from './style'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { useEffect, useState } from 'react';
import MessageDisplay from './components/messageDisplay';
import AddDirectMessageDialog from './components/addDirectMessage.tsx';
import { socket } from '../../../../utilis/socket.io';
import { useTranslation } from 'react-i18next';
import Redirect from '../../../../common/Redirect';

const Message = () => {
  const [isSelected, setisSelected] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [sIdx, setSIdx] = useState<number>();
  const { t } = useTranslation();

  return (
    <MessagesProvider>
      {/* Redirect to home page if the user is not Logined  */}
      <Redirect />
      {open && <AddDirectMessageDialog open={open} setOpen={setOpen} />}
      <Box sx={{ width: { xs: '100%', md: 400 }, p: 1, pb: 0, display: { xs: isSelected ? 'none' : 'block', md: "block" } }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography fontWeight={600} fontSize={22}>{t('pages.messages.header')}</Typography>
          <Box>
            <Tooltip title="settings"><IconButton><SettingsSuggestIcon /></IconButton></Tooltip>
            <Tooltip title="add direct message"><IconButton onClick={() => setOpen(true)}><MapsUgcIcon /></IconButton></Tooltip>
          </Box>
        </Stack>
        <InputBase fullWidth type="text" placeholder={t('pages.messages.direcMsgPlaceholder') as string} sx={{ my: 1 }} />
        <hr />
        <DirectMessages setSIdx={setSIdx} />
      </Box>

      <Box flex={1} sx={{ display: { xs: isSelected ? 'block' : 'none', md: "block" } }}>
        <MessageDisplay isSelected={isSelected} sIdx={sIdx} setSIdx={setSIdx} setisSelected={setisSelected} />
      </Box>
    </MessagesProvider>
  )
}

export default Message