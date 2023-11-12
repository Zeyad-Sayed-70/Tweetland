import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppDispatch,
  RootState,
} from "../../@redux-toolkit/storeConfiguration";
import { updateTweet } from "../../@redux-toolkit/Slices/Tweets/updateTweet/slice";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { useGeneralContext } from "../../generalContext";
import { TweetsProvider } from "./style";
import More from "./components/more";
import ImageTweet from "./components/imageTweet";
import Interactions from "./components/interactions";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const Tweet = ({ data }) => {
  const { isLogging } = useGeneralContext();
  const { setMessageText, setIsMessageOpen } = useGeneralContext();
  const { response, isLoading, isSuccess } = useSelector(
    (state: RootState) => state.utweet
  );
  const [edit, setEdit] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>("");
  const tweetRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setMessageText(response.message);
      setIsMessageOpen(true);
    }
  }, [response, isLoading, isSuccess]);

  const handleEditDone = () => {
    dispatch(updateTweet({ id: data._id, text: editedText }));
    setEdit(false);
  };

  return (
    <TweetsProvider ref={tweetRef}>
      <Avatar
        sx={{ width: 45, height: 45, cursor: "pointer" }}
        src={data.creator_data.avatar}
        alt={data.creator_data.username}
        onClick={() => {
          navigate(`/profile/${data?.creator_data.tagName}`);
        }}
      />
      <Stack gap={1} flex={1}>
        <Box
          className="header"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography fontSize={18} fontWeight={600}>
              {data.creator_data.username}
            </Typography>
            <Typography fontSize={15} fontWeight={500}>
              {data.creator_data.tagName}
            </Typography>
            <Typography fontSize={15} fontWeight={500}>
              . 3m
            </Typography>
          </Stack>
          <More setEdit={setEdit} data={data} />
        </Box>

        {data.type === "text" && (
          <Typography
            contentEditable={edit}
            onInput={(e) => setEditedText((e.target as HTMLElement).innerText)}
          >
            {data.content.text.split(" ").map((s, ind) => {
              if (s[0] === "#")
                return (
                  <span key={ind} className="hashtag">
                    {s}{" "}
                  </span>
                );

              return s + " ";
            })}
          </Typography>
        )}
        {data.type === "image" && (
          <ImageTweet data={data} edit={edit} setEditedText={setEditedText} />
        )}
        {/* {data.type === "video" && } */}

        {edit && (
          <Button sx={{ textTransform: "capitalize" }} onClick={handleEditDone}>
            {t("commons.tweet.editDoneBtn")}
          </Button>
        )}

        {!edit && <Interactions data={data} />}
      </Stack>
    </TweetsProvider>
  );
};

export default Tweet;
