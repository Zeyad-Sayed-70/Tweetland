import { Stack, Box, InputBase, Avatar, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { getMessages } from '../../../../../../@redux-toolkit/Slices/Messages/getMessages/slice';
import { AppDispatch } from '../../../../../../@redux-toolkit/storeConfiguration';
import { useGeneralContext } from '../../../../../../generalContext';
import { socket } from '../../../../../../utilis/socket.io';
import { DirectMessagesProvider } from './style'

const DirectMessages = ({ setSIdx }) => {
  const data = JSON.parse(localStorage.getItem('direct-messages') as string) || [];
  const { t } = useTranslation();
  
  return (
    <DirectMessagesProvider>
      {data.length === 0 && <Typography textAlign='center' mt={3}>{t('pages.messages.notFoundDirecMsgs')}</Typography>}
      {data.map((user, ind) => (
        <DirectMessage key={ind} data={user} index={ind} setSIdx={setSIdx} />
      ))}
    </DirectMessagesProvider>
  )
}

const DirectMessage = ({ data, index, setSIdx }) => {
  const sData = JSON.parse(sessionStorage.getItem('selected-direct-message') as string)
  const sInd = sData?.at(0);
  const dispatch = useDispatch<AppDispatch>();
  const {me} = useGeneralContext();

  useEffect(() => {
    if ( sInd === undefined ) return;

    setSIdx(sInd)
  }, [sInd])
  const handleClick = () => {
    // leave from old room
    if ( sData?.at(1)?._id ) socket.emit('leave-room', sData[1]?._id);
    sessionStorage.setItem('selected-direct-message', JSON.stringify([index, data]));
    setSIdx(index);

    if ( !me?._id ) return;
    const token = localStorage.getItem('token') as string;
    const chatId = [`${me._id}/${data._id}`, `${data._id}/${me._id}`];

    dispatch(getMessages({ token, chatId, userData: me }));
  }
  return (
    <>
      <Box onClick={handleClick} className={`${sInd === index ? 'active' : ''} direct-box`} mb={2} p={2} display='flex' alignItems='center' gap={1}>
        <Avatar sx={{ width: 50, height: 50 }} src={data?.avatar} alt="person-img" />
        <Stack flex={1}>
          <Stack direction='row' gap={1}>
            <Typography className="header" fontWeight={600}>{data.username}</Typography>
            <Typography>{data.tagName}</Typography>
            <Typography>. Mar 3</Typography>
          </Stack>
          <Typography>hello</Typography>
        </Stack>
      </Box>
    </>
  )
}

export default DirectMessages