import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './Slices/Authentication/slice';
import { createMessageSlice } from './Slices/Messages/createMessage/slice';
import { getMessagesSlice } from './Slices/Messages/getMessages/slice';
import { getNotificationsSlice } from './Slices/Notifications/slice';
import { createTweetSlice } from './Slices/Tweets/createTweet/slice';
import { deleteTweetSlice } from './Slices/Tweets/deleteTweet/slice';
import { getTweetsSlice } from './Slices/Tweets/getTweet/slice';
import { toggleLikeSlice } from './Slices/Tweets/toggleLike/slice';
import { updateTweetSlice } from './Slices/Tweets/updateTweet/slice';
import { getMyUserSlice } from './Slices/User/getMyUserData/slice';
import { getUserSlice } from './Slices/User/getUser/slice';
import { getUsersSlice } from './Slices/User/getUsers/slice';

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    ctweet: createTweetSlice.reducer,
    gtweet: getTweetsSlice.reducer,
    dtweet: deleteTweetSlice.reducer,
    utweet: updateTweetSlice.reducer,
    tlike: toggleLikeSlice.reducer,
    guser: getUserSlice.reducer,
    gusers: getUsersSlice.reducer,
    gnotes: getNotificationsSlice.reducer,
    gmsgs: getMessagesSlice.reducer,
    cmsg: createMessageSlice.reducer,
    gmuser: getMyUserSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store