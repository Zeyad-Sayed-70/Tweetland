import { Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccseptDialog from '../../AccseptDialog';
import { AppDispatch, RootState } from '../../../@redux-toolkit/storeConfiguration';
import { useDispatch } from 'react-redux';
import { deleteTweet } from '../../../@redux-toolkit/Slices/Tweets/deleteTweet/slice';
import { useSelector } from 'react-redux';
import { useGeneralContext } from '../../../generalContext';
import { useTranslation } from 'react-i18next';

const More = ({setEdit, data}) => {
  const { me, setMessageText, setIsMessageOpen } = useGeneralContext();
  const { response, isLoading, isSuccess } = useSelector((state: RootState) => state.dtweet);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    if ( !isLoading && isSuccess ) {
      setMessageText(response.message);
      setIsMessageOpen(true);
    }
  }, [response, isLoading, isSuccess])

  const handleDelete = () => {
    const token = localStorage.getItem('token') as string;
    dispatch(deleteTweet({ id: data._id, token }));
    setIsDelete(false);
    setOpen(false);
  }

  const handleBookMark = () => {
    const tweetsData = JSON.parse(localStorage.getItem('bookmarks') as string) || [];
    const pass = !tweetsData.some(e => e._id === data._id);

    setIsMessageOpen(true);
    if ( pass ) {
      localStorage.setItem('bookmarks', JSON.stringify( [...tweetsData, data] ));
      setMessageText(t('commons.tweet.more.addBookmarkMsg'));
      setOpen(false);
      return;
    }
    
    setMessageText(t('commons.tweet.more.errorBookmarkMsg'));
    setOpen(false);
  }
  
  return (
    <div>
      <Button
        sx={{ minWidth: 50, p: 1 }}
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(true)}
      >
        <MoreHorizIcon />
      </Button>
      <Popper
        sx={{ zIndex: '1000' }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            className='more-menu'
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={() => {}}
                >
                  {me?._id === data.creator_data._id && (<>
                  <MenuItem onClick={() => {
                    setEdit(true);
                    setOpen(false);
                  }}>{t('commons.tweet.more.edit')}</MenuItem>
                  <MenuItem onClick={() => {
                    setIsDelete(true);
                    setOpen(false);
                  }}>{t('commons.tweet.more.delete')}</MenuItem>
                  </>)}
                  <MenuItem onClick={handleBookMark}>{t('commons.tweet.more.bookmark')}</MenuItem>
                  <MenuItem onClick={() => {}}>{t('commons.tweet.more.list')}</MenuItem>
                  <MenuItem onClick={() => {}}>{t('commons.tweet.more.report')}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <AccseptDialog open={isDelete} setOpen={setIsDelete} title={t('commons.tweet.more.accDeleteMsg')} acbtn="Delete" handleAccsept={handleDelete}/>
    </div>
  )
}

export default More