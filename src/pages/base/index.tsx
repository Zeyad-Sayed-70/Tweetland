import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookmarks from "./sub-pages/bookmark";
import Explore from "./sub-pages/explore";
import Home from "./sub-pages/home";
import Message from "./sub-pages/message";
import Notification from "./sub-pages/notification";
import Profile from "./sub-pages/profile";
import Setting from "./sub-pages/setting";

const Base = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/messages" element={<Message />} />
      <Route path="/bookmarks" element={<Bookmarks />} />
      <Route path="/profile/:tagName" element={<Profile />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  );
};

export default Base;
