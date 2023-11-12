import { Box, Stack, Typography, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { TrendsProvider } from "./style";
import { useTranslation } from "react-i18next";

const TrendsComp = () => {
  const { t } = useTranslation();
  return (
    <TrendsProvider>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography fontSize={20} fontWeight={800}>
          {t("pages.trends.header")}
        </Typography>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Stack>

      <Stack>
        {trends.map((trend, ind) => (
          <SubTrend key={ind} data={trend} t={t} />
        ))}
      </Stack>
    </TrendsProvider>
  );
};

const SubTrend = ({ data, t }) => (
  <Box className="sub-trend">
    <Stack>
      <Typography className="sub-hd" fontSize={14}>
        {t("pages.trends.trending")} {data.type}
      </Typography>
      <Typography className="tag">#{data.tag}</Typography>
    </Stack>
    {data?.image ? (
      <Box className="box" display="flex" alignItems="center" gap={0.5}>
        <Stack flex={1} px={2} py={1}>
          <Typography className="sub-hd">{data.title}</Typography>
          <Typography fontSize={14}>{data.desc}</Typography>
        </Stack>
        <img
          style={{ width: "70px", height: "90px", objectFit: "cover" }}
          src={`./assets/${data.image}`}
        />
      </Box>
    ) : (
      <Typography className="sub-hd" fontSize={20} fontWeight={700}>
        {data.tweets_count} {t("pages.trends.tweets")}
      </Typography>
    )}
    <Typography className="sub-hd" fontSize={14}>
      {data.people_count} {t("pages.trends.similar")}
    </Typography>
  </Box>
);

const trends = [
  {
    type: "worldwide",
    tag: "BreakingNews",
    title: "Space",
    desc: "Lunar photography improves the discovery of the moon",
    image: "moon-1.jpg",
    people_count: "10,094",
  },
  {
    type: "worldwide",
    tag: "WorldNews",
    tweets_count: "125k",
    people_count: "5,094",
  },
  {
    type: "worldwide",
    tag: "BreakingNews",
    title: "Animals",
    desc: "These cats are ready for #internationalCatDay",
    image: "cat-1.jpg",
    people_count: "2,757",
  },
  {
    type: "worldwide",
    tag: "GreatestOfAllTime",
    tweets_count: "100k",
    people_count: "4,123",
  },
];

export default TrendsComp;
