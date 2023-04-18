import { Stack } from '@mui/material'
import NavigationSide from '../common/Navigation/NavigationSide'
import Base from './base'
import Trends from './Trends'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// trends
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { LayoutProvider } from './style';
import { useGeneralContext } from '../generalContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constants/backend';

const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  axios.post(`${BACKEND_URL}/upload`, formData);
}

const Layout = () => {
  const handleSelect = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  }
  return (
    <LayoutProvider>
      <Router>
        {/* <input type='file' onChange={handleSelect} /> */}
        <Stack className='column-container' sx={{ width: { xs: '100%', lg: '400px' }, }}><NavigationSide /></Stack>
        <Stack className='column-container' sx={{ width: { xs: '100%', md: 'auto' }, flex: { md: 2 }, height: { xs: 'calc(100% - 66px)', lg: 'auto' }, order: { xs: 1, md: 0 } }}><Base /></Stack>
        <Stack className='column-container' sx={{ width: { xs: '100%', md: 'auto' } }}><Trends /></Stack>
      </Router>
    </LayoutProvider>
  )
}

export default Layout