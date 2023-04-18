import { Avatar, Box, Stack, Typography } from '@mui/material'
import { TweetsProvider } from '../../../../../../common/Tweets/style';
import ImageTweet from '../../../../../../common/Tweets/components/imageTweet';

const TweetInBookmark = ({data}) => {
  return (
    <TweetsProvider>
      <Avatar sx={{ width: 45, height: 45 }} src={data.creator_data.avatar} alt={data.creator_data.username} />
      <Stack gap={1} flex={1}>
        <Box className='header' display='flex' alignItems='center' gap={1}>
          <Typography fontSize={18} fontWeight={600}>{data.creator_data.username}</Typography>
          <Typography fontSize={15} fontWeight={500}>{data.creator_data.tagName}</Typography>
          <Typography fontSize={15} fontWeight={500}>. 3m</Typography>
        </Box>

        {data.type === "text" && <Typography>
          {data.content.text.split(" ").map((s, ind) => {
            if ( s[0] === "#" )
              return <span key={ind} className="hashtag">{s} </span>

            return s + " ";
          })}
        </Typography>}
        {data.type === "image" && <ImageTweet data={data} edit={null} setEditedText={null} />}
        {/* {data.type === "video" && } */}
      </Stack>
    </TweetsProvider>
  )
}

export default TweetInBookmark