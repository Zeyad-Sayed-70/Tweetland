import { Tooltip, Typography, Button, DialogActions, Dialog, DialogTitle, DialogContent, Box, IconButton, Stack, InputBase } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useGeneralContext } from '../../../generalContext';
import { CTweetProvider } from '../style/dialog';
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { createTweet } from '../../../@redux-toolkit/Slices/Tweets/createTweet/slice';
import { AppDispatch, RootState } from '../../../@redux-toolkit/storeConfiguration';
import { useSelector } from 'react-redux';
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css'

const CTweetDialog = ({ open, setOpen, text, setText }) => {
  const { tweet, isLoading, isSuccess } = useSelector((state: RootState) => state.ctweet); 
  const { t } = useTranslation();
  const { me, setMessageText, setIsMessageOpen } = useGeneralContext();
  const dispatch = useDispatch<AppDispatch>();
  const [typeNum, setTypeNum] = useState<number>(0);
  // const [text, setText] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    if ( !isLoading && isSuccess ) {
      setMessageText(tweet.message);
      setIsMessageOpen(true);
      setOpen(false);
      setIsCreating(false)
    }
  }, [tweet, isLoading, isSuccess])

  const handleCreateTweet = () => {
    const type = typeNum === 0 ? "text" : typeNum === 1 ? "image" : "video";

    if ( me === null || !me?._id ) return;
    if ( type === 'text' && text === '' ) return;
    if ( type !== 'text' && file === undefined ) return;

    const token = localStorage.getItem('token') as string;

    const formData = new FormData();
    
    (type !== 'text' && file) && formData.append('file', file);
    formData.append('type', type);
    formData.append('content', JSON.stringify({ text }));
    formData.append('creator_data', JSON.stringify({
      _id: me._id,
      username: me.username,
      tagName: me.tagName,
      avatar: me?.avatar
    }))

    dispatch(createTweet({formData, token}))
    setIsCreating(true)
  }

	return (
	  <Dialog open={open} onClose={() => setOpen(false)}>
      <CTweetProvider>
        <DialogTitle>{t('commons.createTweet.dialogHeader')}</DialogTitle>
        <DialogContent sx={{ width: '420px' }}>
          {typeNum === 0 && <TextType text={text} setText={setText}/>}
          {typeNum === 1 && <ImageType text={text} setText={setText} setFile={setFile} />}
          {typeNum === 2 && <VideoType text={text} setText={setText}/>}

          <Stack
            direction='row'
            alignItems='center'
            gap={1}
            >
            <Tooltip title={t('commons.createTweet.title.text')}>
              <IconButton className={`${typeNum === 0 ? 'tx-primary' : 'tx-secondary'}`} onClick={() => setTypeNum(0)}>
                <TextsmsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('commons.createTweet.title.image')}>
              <IconButton className={`${typeNum === 1 ? 'tx-primary' : 'tx-secondary'}`} onClick={() => setTypeNum(1)}>
                <ImageIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('commons.createTweet.title.video') + " / not support yet"}>
              <IconButton disabled className={`${typeNum === 2 ? 'tx-primary' : 'tx-secondary'}`} onClick={() => setTypeNum(2)}>
                <VideoCameraBackIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </DialogContent>
        <DialogActions>
        {/* <Button
          variant='contained' 
          sx={
            { 
              backgroundColor: '#179cf0', 
              borderRadius: 10, 
              px: 2, 
              fontWeight: 600, 
              textTransform: 'capitalize', 
              fontSize: 16, 
            }
          }
          onClick={handleCreateTweet}
          disabled={isCreating}
          >
            {t(`commons.navigation.tweetBtn`)}
          </Button> */}
          <LoadingButton 
          variant='contained' 
          sx={
            { 
              backgroundColor: '#179cf0', 
              borderRadius: 10, 
              px: 2, 
              fontWeight: 600, 
              textTransform: 'capitalize', 
              fontSize: 16, 
            }
          }
          onClick={handleCreateTweet}
          disabled={isCreating}
          loading={isCreating}
          >
            <span>{t(`commons.navigation.tweetBtn`)}</span>
          </LoadingButton>
        </DialogActions>
      </CTweetProvider>
	  </Dialog>
	)
}


const TextType =  ({ text, setText }) => {
  const { t } = useTranslation();
  return (
    <>
      <Box>
        <textarea
          className="bg-secondary tx-secondary"
          placeholder={t('commons.createTweet.textPlaceholder') as string}
          value={text}
          style={{
            height: '250px', 
            width: '100%',
            resize: 'none',
            border: 'none',
            padding: '1rem 0',
            fontSize: '1.5rem',
            outline: 'none'
          }}
          onChange={(e) => setText(e.target.value)}
        />
      </Box>
    </>
  )
}

const ImageType =  ({ text, setText, setFile }) => {
  const { t } = useTranslation();
  function getImageFileObject(imageFile) {
    setFile(imageFile.file)
  }

  function runAfterImageDelete(file) {
    // console.log({ file })
  }

  return (
    <>
      <InputBase 
        type='text'
        placeholder={t('commons.createTweet.caption') as string}
        className='tx-secondary'
        sx={{ width: '100%' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Typography className="tx-secondary">
        {t('commons.createTweet.imageUpload')}
      </Typography>
      <ImageUploader
        style={{ marginBottom: '1rem' }}
        onFileAdded={(img) => getImageFileObject(img)}
        onFileRemoved={(img) => runAfterImageDelete(img)}
      />
    </>
  )
}

const VideoType =  ({ text, setText }) => {
  const { t } = useTranslation();
  return (
    <>
      {/* <InputBase 
        type='text'
        placeholder={t('commons.createTweet.caption') as string}
        className='tx-secondary'
        sx={{ width: '100%' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Typography className="tx-secondary">
        {t('commons.createTweet.videoUpload')}
      </Typography> */}
      <Typography className='tx-secondary' textAlign='center' py={2}>Not Supported Yet</Typography>
    </>
  )
}


export default CTweetDialog