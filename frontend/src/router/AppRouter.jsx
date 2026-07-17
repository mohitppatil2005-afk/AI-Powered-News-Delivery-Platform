import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Bookmarks from "../pages/Bookmarks";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Preferences from "../pages/Preferences";
import Likes from "../pages/Likes";
import History from "../pages/History";

function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/bookmarks" element={<Bookmarks/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/preferences" element={<Preferences />} />
                <Route path="/likes" element={<Likes />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;