import { Icon, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CreateTweet from "../../../../common/createTweet";
import { HomeProvider } from "./style";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import Tweet from "../../../../common/Tweets";
import { MutableRefObject, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppDispatch,
  RootState,
} from "../../../../@redux-toolkit/storeConfiguration";
import { getTweets } from "../../../../@redux-toolkit/Slices/Tweets/getTweet/slice";
import { useSelector } from "react-redux";
import useElementOnScreen from "./components/intersectionObserve";
import { useGeneralContext } from "../../../../generalContext";

const Home = () => {
  const { isLogging } = useGeneralContext();
  const {
    tweets: { tweets },
    isLoading,
  } = useSelector((state: RootState) => state.gtweet);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [tweetsData, setTweetsData] = useState<any[]>([]);
  const [skipTimes, setSkipTimes] = useState<number>(1);
  const [ref, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  const token = localStorage.getItem("token") as string;
  let fetch_once = true;

  useEffect(() => {
    if (!fetch_once) return;
    // Fetch initial tweets
    dispatch(getTweets({ token, SKIP: 0 }));
    fetch_once = false;
  }, []);

  useEffect(() => {
    if (tweets) {
      const tweets_ids = tweets.map((t) => t._id);
      const isFind = tweetsData.some((t) => tweets_ids.includes(t._id));
      if (isFind) return;

      setTweetsData((prev) => [...prev, ...tweets]);
    }
  }, [tweets]);

  useEffect(() => {
    // Fetch extra tweets when sroll down
    if (!isVisible) return;

    dispatch(getTweets({ token, SKIP: skipTimes }));
    if (tweets?.length === 0) return;
    setSkipTimes((prev) => prev + 1);
  }, [isVisible]);

  // if (isLoading || !isSuccess) return <></>;
  console.log(isLoading);

  return (
    <HomeProvider>
      <Stack
        className="main-header"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        <Typography fontSize={20} fontWeight={600} textTransform="capitalize">
          {t("pages.home.header")}
        </Typography>
        <Icon>
          <AutoAwesomeOutlinedIcon sx={{ color: "#179cf0" }} />
        </Icon>
      </Stack>

      {isLogging && <CreateTweet />}

      <Stack gap={1} pt={2}>
        {tweetsData?.map((tweet, ind) => (
          <Tweet key={ind} data={tweet} />
        ))}
      </Stack>
      <div ref={ref as MutableRefObject<null>}></div>
      {isLoading && <Typography className="loading">Loading...</Typography>}
      {tweets?.length === 0 && (
        <Typography className="notfound">
          {t("pages.home.notFoundMsg")}
        </Typography>
      )}
    </HomeProvider>
  );
};

export default Home;
