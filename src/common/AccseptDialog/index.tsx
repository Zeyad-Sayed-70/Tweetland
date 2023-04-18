import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'

const AccseptDialog = ({ open, setOpen, title, acbtn, handleAccsept }) => {
  const handleClose = () => setOpen(false);
  return (
  <Dialog open={open}>
    <DialogTitle>
      {title}
    </DialogTitle>
    <DialogActions sx={{ display: 'flex', justifyContent: "flex-end" }}>
      <Button onClick={handleClose} variant="outlined">close</Button>
      <Button onClick={handleAccsept} variant="contained">{acbtn}</Button>
    </DialogActions>
  </Dialog>
  )
}

export default AccseptDialog