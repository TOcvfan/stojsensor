import React, { useState } from "react";
import Login from "../pages/Login/Login";
import { Box } from "@mui/material";
import Title from './title';
import { user } from '../helpers/users';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import NoPage from "../pages/NoPage/noPage";
import Layout from "../pages/Layout/layout";
import NewUser from "../pages/NewUser/newUser";
import Frontpage from "../pages/frontpage/frontpage";
import ControlPage from "../pages/Control/control";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userlogin, setUser] = useState(user.users[0]);
  const about = { name: 'About us', link: '/om' };

  let pagesLoggedIn = [
    { name: 'Frontpage', link: '/forside' },
    { name: 'Control panel', link: '/control' },
    about
  ]

  let pagesNotLoggedIn = [
    { name: 'Home', link: '/' },
    about,
    { name: 'Log in', link: '/login' },
  ]

  const pages = () => {
    if (isLoggedIn) {
      return pagesLoggedIn
    } else {
      return pagesNotLoggedIn
    }
  }

  const hej = "DB Støjsensor"

  const sider = () => {
    if (isLoggedIn) {
      return (
        <>
          <Route path="/create" element={<NewUser />} />
          <Route path="/forside" element={<Frontpage user={userlogin} />} />
          <Route path="/control" element={<ControlPage user={userlogin} />} />
        </>
      )
    } else {
      return (
        <>
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        </>
      )
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout pages={pages()} navn={hej} />}>
          <Route index element={<Home />} />
          <Route path='/om' element={<About />} />
          {sider()}
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;