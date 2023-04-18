import { Box, Stack, Typography, IconButton, InputBase } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { MessageDisplayProvider } from './style';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { socket } from '../../../../../../utilis/socket.io';
import { useGeneralContext } from '../../../../../../generalContext';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../@redux-toolkit/storeConfiguration';
import { useDispatch } from 'react-redux';
import { createMessage } from '../../../../../../@redux-toolkit/Slices/Messages/createMessage/slice';
import { useTranslation } from 'react-i18next';

interface MESSAGE {
  id?: string,
  message: string,
  rid?: string,
  username: string,
  uid: string,
}

const MessageDisplay = ({ setSIdx, sIdx, setisSelected, isSelected }) => {
  const ls = JSON.parse(localStorage.getItem('direct-messages') as string);
  const data = sIdx !== undefined ? ls?.at(sIdx) : null;
  const {me} = useGeneralContext();
  const [messageText, setMessageText] = useState<string>('');
  const [currMessages, setCurrMessages] = useState<MESSAGE[]>([]);
  const [oldMessages, setOldMessages] = useState<MESSAGE[]>([]);
  const { messagesData, isLoading, isSuccess } = useSelector((state: RootState) => state.gmsgs);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleBack = () => {
    setSIdx(undefined);
    setisSelected(false);
    sessionStorage.removeItem('selected-direct-message');
    socket.emit('leave-room', data._id);
  }

  const handleAddMessage = () => {
    if ( messageText === '' || !me?._id ) return;

    // send message to socket server to real-time sending
    socket.emit('send-message', { 
      message: messageText, 
      rid: data._id, 
      uid: me._id,
      username: me.username,
    });

    if ( !me?._id ) return;
    const token = localStorage.getItem('token') as string;
    const chatId = [`${me._id}/${data._id}`, `${data._id}/${me._id}`];
    const message = {
      username: me.username,
      uid: me._id,
      message: messageText
    }
    // save message in database through sending it to server
    dispatch(createMessage({ chatId, message, token }))

    // clean input
    setMessageText('');
  }
  
  useEffect(() => {
    if ( isLoading || !isSuccess ) return;

    setOldMessages(messagesData.data.messages)
  }, [messagesData, isLoading, isSuccess])

  useEffect(() => {
    if ( data ) {
      setisSelected(true);
    
      // join chat room
      socket.emit('join-room', data._id);
    }
  }, [data])
  
  useEffect(() => {
    socket.on('recive-message', (data: MESSAGE) => {
      const messages = [...currMessages, data];
      setCurrMessages(messages);
    })

    socket.on('clean-old-data', b => setCurrMessages([]));
  }, [socket, currMessages])
  
  if ( !data ) {
    return <>
      <Typography 
        className='hero' 
        fontWeight={600} 
        fontSize={24} 
        textAlign='center'
        height='100%'
        display='flex'
        alignItems='center'
        width={400}
        mx={'auto'}
      >
        {t('pages.messages.pleaseSelectDMMsg')}
      </Typography>
    </> 
  }

  if ( isLoading ) {
    return <Typography className='loading' textAlign='center' py={3}>Loading...</Typography>
  }

  return (
    <MessageDisplayProvider>
      <Box p={1} display='flex' alignItems='center'>
        <IconButton sx={{ display: { xs: "block", md: "none" } }} onClick={handleBack}><KeyboardArrowLeftIcon /></IconButton>
        <IconButton sx={{ ml: 'auto' }}><InfoIcon /></IconButton>
      </Box>
      <Stack flex={1} my={1} px={2} overflow='auto'>
        {oldMessages.map((msg) => (
          <Box className={`${msg.uid === me?._id ? 'my-message' : 'other-message'}`}>
            <span>{msg.username}</span>
            <Typography>{msg.message}</Typography>
          </Box>
        ))}
        {currMessages.map(msg => (
          <Box className={`${msg.uid === me?._id ? 'my-message' : 'other-message'}`}>
            <span>{msg.username}</span>
            <Typography>{msg.message}</Typography>
          </Box>
        ))}
      </Stack>
      <Box className="send-message" display="flex" alignItems='center'>
        <IconButton><AddPhotoAlternateIcon /></IconButton>
        <IconButton><EmojiEmotionsIcon /></IconButton>
        <InputBase value={messageText} onChange={(e) => setMessageText(e.target.value)} fullWidth type='text' placeholder={t('pages.messages.sendMsgPlaceholder') as string} />
        <IconButton className="send-btn" onClick={handleAddMessage}><SendIcon /></IconButton>
      </Box>
    </MessageDisplayProvider>
  )
}

export default MessageDisplay