import { Autocomplete, Icon, IconButton, InputBase, TextField } from '@mui/material';
import { SearchProvider } from './style';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../@redux-toolkit/storeConfiguration';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUsers } from '../../../../@redux-toolkit/Slices/User/getUsers/slice';
import { useNavigate } from 'react-router';

const Search = () => {
  const { users, isLoading, isSuccess } = useSelector((state: RootState) => state.gusers);
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<Array<Object>>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if ( isLoading || !isSuccess ) return;
    const updated = users.usersData.map(user => {
      return {...user, label: user.username};
    });

    setData(updated);
  }, [users, isLoading, isSuccess])
  
  const fetchUsersFunc = () => {
    const token = localStorage.getItem('token') as string;
    dispatch(getUsers(token));
  }

  return (
    <SearchProvider>    
      <Autocomplete
        sx={{ flex: 1 }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.sort((a: any, b: any) => {
          if ( a.label < b.label ){
            return -1;
          }
          if ( a.label > b.label ){
            return 1;
          }
          return 0;
        })}
        onFocus={fetchUsersFunc}
        onChange={(e, value: any) => navigate(`/profile/${value.tagName}`)}
        renderInput={(params) => (
          <TextField
          sx={{ border: 'none' }}
            {...params}
            label={t('pages.trends.search_label')}
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </SearchProvider>
  )
}

export default Search