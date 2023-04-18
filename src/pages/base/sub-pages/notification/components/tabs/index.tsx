import {Stack, Button} from '@mui/material';
import { useTranslation } from 'react-i18next';

const Tabs = ({tab, setTab}) => {
  const { t } = useTranslation();
  return (
    <Stack className="tabs" direction="row">
      <Button className={`${tab === 0 ? "active" : ""}`} sx={{ flex: 1, py: 2 }} onClick={() => setTab(0)}>{t('pages.notification.tabs.all')}</Button>
      <Button className={`${tab === 1 ? "active" : ""}`} sx={{ flex: 1, py: 2 }} onClick={() => setTab(1)}>{t('pages.notification.tabs.verified')}</Button>
      <Button className={`${tab === 2 ? "active" : ""}`} sx={{ flex: 1, py: 2 }} onClick={() => setTab(2)}>{t('pages.notification.tabs.mentions')}</Button>
    </Stack>
  )
}

export default Tabs