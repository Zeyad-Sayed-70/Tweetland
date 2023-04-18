import { Snackbar } from '@mui/material';
import { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getMyUserData } from './@redux-toolkit/Slices/User/getMyUserData/slice';
import { getUser } from './@redux-toolkit/Slices/User/getUser/slice';
import { AppDispatch, RootState } from './@redux-toolkit/storeConfiguration';

type ME = {
  _id: string,
  username: string,
  tagName: string,
  email: string,
  birth: string,
  avatar?: string,
}

const initMe: ME = {
  _id: "",
  username: '',
  tagName: "",
  email: "",
  birth: "",
  avatar: ''
}

export type GlobalContentType = {
  me: ME | null;
  setMe: (value: ME) => void;
  isLogging: boolean;
  setIsLogging: (value: boolean) => void;
  isLoading: boolean;
  isMessageOpen: boolean;
  setIsMessageOpen: (value: boolean) => void;
  messageText: string;
  setMessageText: (value: string) => void;
  lang: string,
  setLang: (value: string) => void
}

export const GlobalContext = createContext<GlobalContentType>({
  me: initMe,
  setMe: () => { },
  isLogging: false,
  setIsLogging: () => { },
  isLoading: false,
  isMessageOpen: false,
  setIsMessageOpen: () => { },
  messageText: "",
  setMessageText: () => { },
  lang: "",
  setLang: () => { }
})

export const useGeneralContext = () => useContext(GlobalContext);

const GeneralContextProvider = ({ children }) => {
  const { user, isLoading, isError } = useSelector((state: RootState) => state.gmuser);
  const [me, setMe] = useState(initMe);
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const [messageText, setMessageText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation()

  const langStored = JSON.parse(localStorage.getItem('lang') as string)
  const [lang, setLang] = useState<string>(langStored || 'en')

  useEffect(() => {
    // fetch user data (me)
    const token = localStorage.getItem('token') as string;
    if (token) dispatch(getMyUserData({ token }))
  }, [dispatch])

  useEffect(() => {
    if (isLoading || isError || !user?.userData) return;

    setMe(user.userData);
  }, [user])

  useEffect(() => {
    if (!me._id) return;
    const token = localStorage.getItem('token') as string;

    if (token)
      setIsLogging(true);
  }, [me, isLogging])

  useEffect(() => {
    if (!lang) return;
    localStorage.setItem('lang', JSON.stringify(lang));
    i18n.changeLanguage(lang)
  }, [lang])

  return (
    <GlobalContext.Provider value={{
      me,
      setMe,
      isLogging,
      setIsLogging,
      isLoading,
      setIsMessageOpen,
      setMessageText,
      isMessageOpen,
      messageText,
      lang,
      setLang
    }}>

      <Snackbar
        open={isMessageOpen}
        autoHideDuration={6000}
        onClose={() => setIsMessageOpen(false)}
        message={messageText}
      />

      {children}
    </GlobalContext.Provider>
  )
}

export default GeneralContextProvider