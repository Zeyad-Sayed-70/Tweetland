import { Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, TextField, Button, Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../../../../@redux-toolkit/Slices/User/getUsers/slice';
import { AppDispatch, RootState } from '../../../../../../@redux-toolkit/storeConfiguration';
import { useGeneralContext } from '../../../../../../generalContext';
import { AddDirectMgsProvider } from './style';

interface SELECTEDUSER {
  _id: string,
  username: string,
  tagName: string,
  avatar?: string,
}

const AddDirectMessageDialog = ({ open, setOpen }) => {
  const { users, isLoading, isSuccess } = useSelector((state: RootState) => state.gusers);
  const { setMessageText, setIsMessageOpen } = useGeneralContext();
  const [selected, setSelected] = useState<SELECTEDUSER>();
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<Array<Object>>([]);
  const { t } = useTranslation();
  useEffect(() => {
    if ( isLoading || !isSuccess ) return;
    const updated = users.usersData.map(user => {
      return {...user, label: user.username};
    });

    setData(updated);
  }, [users, isLoading, isSuccess])

  useEffect(() => {
    const token = localStorage.getItem('token') as string;
    dispatch(getUsers(token));
  }, [dispatch])

  const onAdd = () => {
    if ( !selected || Object.keys(selected).length === 0 ) {
      setIsMessageOpen(true);
      setMessageText(t('pages.messages.errorDontSelectMsg'));
      return;
    }
    
    const old = JSON.parse(localStorage.getItem('direct-messages') as string) || [];

    const isNotUniqe = old.some((user) => user?._id === selected._id);
    
    if ( isNotUniqe ) {
      setIsMessageOpen(true);
      setMessageText(t('pages.messages.errorAddedBeforeMsg'));
      return;
    }

    localStorage.setItem('direct-messages', JSON.stringify([...old, selected]));

    setIsMessageOpen(true);
    setMessageText(t('pages.messages.addedMsg'));

    setOpen(false);
  }

  if ( isLoading || !isSuccess ) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  };

  return (
    <Dialog open={open}>
      <AddDirectMgsProvider>
        <DialogTitle>{t('pages.messages.dialogDMHeader')}</DialogTitle>
        <DialogContent sx={{ height: 400, width: 400, maxWidth: '100%' }}>
          <Autocomplete
            disablePortal
            onChange={(e, val) => setSelected(val as SELECTEDUSER)}
            id="combo-box-demo"
            options={data}
            sx={{ width: "100%", mt: 1 }}
            renderInput={(params) => <TextField {...params} label={t('pages.messages.searchLabel')} />}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>{t('pages.messages.dialogDMClose')}</Button>
          <Button variant="contained" onClick={onAdd}>{t('pages.messages.dialogDMAdd')}</Button>
        </DialogActions>
      </AddDirectMgsProvider>
    </Dialog>
  )
}

export default AddDirectMessageDialog