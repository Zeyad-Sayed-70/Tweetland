import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import Login from './login'
import Register from './register'

const AuthDialog = ({open, setOpen}) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const handleClose = () => {
    setOpen(false);
    setIsLogin(true);
  }
  return (
    <>
    <Dialog open={open}>
        {isLogin  
        ? <Login setIsLogin={setIsLogin} handleClose={handleClose} />
        : <Register setIsLogin={setIsLogin} handleClose={handleClose}/>}
    </Dialog>
    </>
  )
}

export default AuthDialog