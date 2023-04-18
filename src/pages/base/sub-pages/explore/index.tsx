import { IconButton, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { ExploreProvider } from './style';
import Icon from '@mui/material/Icon';
import { useTranslation } from 'react-i18next';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const Explore = () => {
  const { t } = useTranslation();
  return (
    <ExploreProvider>
      <Stack className='main-header' direction='row' alignItems='center' justifyContent='space-between' sx={{ p: 2 }}>
        <Typography fontSize={20} fontWeight={600} textTransform='capitalize'>{t('pages.explore.trends_header')}</Typography>
        <Icon><TravelExploreIcon sx={{ color: '#179cf0' }}/></Icon>
      </Stack>
      <Stack>
        {trends.map((trend, ind) => (
          <Box className="box" key={ind} py={2} px={2} display='flex' alignItems='center' justifyContent='space-between'>
            <Stack className="hashtag">
              <IconButton sx={{ width: 30, height: 30 }}>...</IconButton>
              <Typography className='tag' fontSize={18} fontWeight={600}>#{trend.tag}</Typography>
            </Stack>
            <Stack>
              <Typography fontSize={14} color="#a7a7a7">{t('pages.explore.trending_in')}</Typography>
              <Typography fontSize={14} color="#a7a7a7">{trend.tweets_count} {t('pages.explore.tweets_tx')}</Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </ExploreProvider>
  )
}

const trends = [
  { tag: "1 Bitcoin", tweets_count: "200k" },
  { tag: "President Obama", tweets_count: "400k" },
  { tag: "Jen Psaki", tweets_count: "120k" },
  { tag: "BullMarket", tweets_count: "450k" },
  { tag: "Pocahontas", tweets_count: "1.2k" },
  { tag: "Ethiopia", tweets_count: "1k" },
  { tag: "FOMC", tweets_count: "100k" },
  { tag: "Iowa", tweets_count: "2k" },
  { tag: "London Football Awards", tweets_count: "2k" },
  { tag: "Tatum", tweets_count: "20.2k" },
  { tag: "Giannis", tweets_count: "10k" },
  { tag: "Jordan Poole", tweets_count: "350k" },
]

export default Explore