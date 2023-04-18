import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Authentication from '../../common/Authentication'
import { useGeneralContext } from '../../generalContext';
import Main from './components';

const Trends = () => {
  const { me, isLogging } = useGeneralContext();

  if ( !isLogging ) {
    return <Authentication />
  }

  return (
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/explore" element={<Main />} />
        <Route path="/notification" element={<Main />} />
        <Route path="/bookmarks" element={<Main />} />
        <Route path="/profile/:tagName" element={<Main />} />
    </Routes>
  ) 
}

export default Trends