import './App.css';
import {Route, Routes} from "react-router-dom";
import UserPage from "./routes/UserPage";
import React from "react";
import Layout from "./components/Layout";
import HomePage from "./routes/HomePage";
import ArtistPage from "./routes/ArtistPage";
import PageNotFound from "./routes/PageNotFound";
import AlbumPage from "./routes/AlbumPage";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Layout />} >
            <Route index element={<HomePage />} />
            <Route path="user" element={<UserPage />} />
            <Route path="artists/:id" element={<ArtistPage />} />
            <Route path="albums/:id" element={<AlbumPage/>} />
        </Route>
        <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default App;
