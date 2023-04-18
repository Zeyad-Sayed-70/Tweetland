import {Typography, Stack, Box} from '@mui/material'
import { BACKEND_URL } from '../../../constants/backend'

const ImageTweet = ({data, edit, setEditedText}) => {
  return (
    <Stack gap={2}>
      <Typography contentEditable={edit} onInput={(e) => setEditedText((e.target as HTMLElement).innerText)}>
        {data.content.text.split(" ").map((s, ind) => {
          if ( s[0] === "#" )
            return <span key={ind} className="hashtag">{s} </span>
            
          return s + " ";
        })}
      </Typography>
      <Box>
        <img style={{ width: '100%', maxHeight: '450px', objectFit: 'contain', backgroundColor: '#333' }} src={`${BACKEND_URL}/file/${data.content.url}`} alt="dog6" />
      </Box>
    </Stack>
  )
}

export default ImageTweet