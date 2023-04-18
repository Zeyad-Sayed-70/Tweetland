import HouseIcon from '@mui/icons-material/House';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MoreOutlinedIcon from '@mui/icons-material/MoreOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

export const navigationList = [
    {
        title: 'home',
        icon: <HouseIcon />,
        link: '/'
    },
    {
        title: 'explore',
        icon: <TagIcon />,
        link: '/explore'
    },
    {
        title: 'notification',
        icon: <NotificationsNoneOutlinedIcon />,
        link: '/notification'
    },
    {
        title: 'messages',
        icon: <EmailOutlinedIcon />,
        link: '/messages'
    },
    {
        title: 'bookmarks',
        icon: <BookmarkBorderOutlinedIcon />,
        link: '/bookmarks'
    },
    {
        title: 'profile',
        icon: <AccountCircleOutlinedIcon />,
        link: '/profile'
    },
    {
        title: 'setting',
        icon: <SettingsSuggestIcon />,
        link: '/setting'
    },
];