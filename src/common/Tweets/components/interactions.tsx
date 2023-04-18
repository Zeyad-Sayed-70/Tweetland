import { IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../@redux-toolkit/storeConfiguration";
import { addLike } from '../../../@redux-toolkit/Slices/Tweets/toggleLike/slice';
import { useGeneralContext } from "../../../generalContext";
import { useEffect, useState} from "react";
import { createTweet } from "../../../@redux-toolkit/Slices/Tweets/createTweet/slice";
import AccseptDialog from "../../AccseptDialog";
import { useSelector } from "react-redux";

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import { useTranslation } from "react-i18next";

const Interactions = ({data}) => {
  const {me, setMessageText, setIsMessageOpen} = useGeneralContext();
  const { message: { message }, isLoading, isSuccess } = useSelector((state: RootState) => state.tlike);
  const dispatch = useDispatch<AppDispatch>();
  const [tweetData, setTweetData] = useState<any>({});
  const [inAct, setInAct] = useState({isLike: false, isRetweet: false});
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    if ( !isLoading && isSuccess ) {
      setMessageText(message);
      setIsMessageOpen(true);
    }
  }, [message, isLoading, isSuccess])

  useEffect(() => {
    // check if i pressed like on this tweet before
    const isLike = data?.interactions?.likes.users.some(user => user === me?._id);
    const isRetweet = data?.interactions?.retweets.users.some(user => user === me?._id);
    setInAct({isRetweet, isLike});

    // store my tweet data in state
    setTweetData(data);
  }, [data])
  const onLike = () => {
    if ( !me?._id ) return;
    
    const token = localStorage.getItem('token') as string;

    // prep request data
    const request = {
      token,
      pid: data._id as string,
      uid: me._id,
      type: inAct.isLike ? 'DEC' : 'INC' as "INC" | "DEC",
      me,
      oid: data.creator_data._id,
    }
    
    // update likes count
    if (inAct.isLike) {
      setTweetData({...tweetData, interactions: { ...tweetData.interactions, likes: { ...tweetData.interactions.likes, count: parseInt(tweetData.interactions.likes.count) - 1 } }});
    } else {
      setTweetData({...tweetData, interactions: { ...tweetData.interactions, likes: { ...tweetData.interactions.likes, count: parseInt(tweetData.interactions.likes.count) + 1 } }});
    }

    setInAct({...inAct, isLike: !inAct.isLike});

    dispatch(addLike(request));
  }

  const onRetweet = () => {
    if ( !me?._id ) return;
    
    const token = localStorage.getItem('token') as string;

    const formData = new FormData();
    
    formData.append('isRetweet', 'true');
    formData.append('pid', data._id);
    formData.append('type', data.type);
    formData.append('content', JSON.stringify({ text: data.content.text, url: data.content?.url }));
    formData.append('creator_data', JSON.stringify({
      _id: me._id,
      username: me.username,
      tagName: me.tagName,
      avatar: me?.avatar
    }))
    
    // update likes count
    setTweetData({...tweetData, interactions: { ...tweetData.interactions, retweets: { ...tweetData.interactions.retweets, count: parseInt(tweetData.interactions.retweets.count) + 1 } }});

    setInAct({...inAct, isRetweet: true});

    dispatch(createTweet({formData, token}));
    setOpen(false);
  }
  return <>
    <Stack flex={1} direction='row' alignItems='center' justifyContent='space-around'>
      <Stack className='' direction='row' alignItems='center' gap={.5}>
        <Tooltip title={t('commons.tweet.interactions.title.comment')}><IconButton id="comment"><ChatBubbleOutlineOutlinedIcon /></IconButton></Tooltip>
        <Typography fontWeight={600}>{tweetData?.interactions?.comments}</Typography>
      </Stack>
      <Stack className={`${inAct.isRetweet ? 'active' : ''}`} direction='row' alignItems='center' gap={.5}>
        <Tooltip title={t('commons.tweet.interactions.title.retweet')}><IconButton id="repost" onClick={() => setOpen(true)}><CachedOutlinedIcon /></IconButton></Tooltip>
        <Typography fontWeight={600}>{tweetData?.interactions?.retweets.count}</Typography>
        <AccseptDialog
          open={open}
          setOpen={setOpen}
          title={t('commons.tweet.interactions.accRetweetMsg')}
          acbtn={t('commons.tweet.interactions.accRetweetBtn')}
          handleAccsept={onRetweet}
        />
      </Stack>
      <Stack className={`${inAct.isLike ? 'active' : ''}`} direction='row' alignItems='center' gap={.5}>
        <Tooltip title={t('commons.tweet.interactions.title.like')}><IconButton id="like" onClick={onLike}><FavoriteBorderOutlinedIcon /></IconButton></Tooltip>
        <Typography fontWeight={600}>{tweetData?.interactions?.likes.count}</Typography>
      </Stack>
      <Stack direction='row' alignItems='center' gap={.5}>
        <Tooltip title={t('commons.tweet.interactions.title.share')}><IconButton id="share"><IosShareOutlinedIcon /></IconButton></Tooltip>
      </Stack>
    </Stack>
  </>
}

export default Interactions