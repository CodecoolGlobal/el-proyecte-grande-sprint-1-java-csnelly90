import './App.css';
import {Route, Routes} from "react-router-dom";
import UserPage from "./routes/UserPage";
import Layout from "./components/Layout";
import HomePage from "./routes/HomePage";
import {LoginPage} from "./routes/LoginPage";
import {SignupPage} from "./routes/SignupPage";
import ArtistPage from "./routes/ArtistPage";
import PageNotFound from "./routes/PageNotFound";
import AlbumPage from "./routes/AlbumPage";
import SearchPage from "./routes/SearchPage";
import TopTrendingArtistPage from "./routes/TopTrendingArtistPage";
import TopTrendingAlbumPage from "./routes/TopTrendingAlbumPage";
import TopTrendingSongPage from "./routes/TopTrendingSongPage";
import {AuthProvider} from "./security/auth";
import {RequireAuth} from "./security/requireAuth";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signup" element={<SignupPage/>}/>
                    <Route path="user" element={<RequireAuth><UserPage/></RequireAuth>}/>
                    <Route path="artists/:id" element={<ArtistPage/>}/>
                    <Route path="albums/:id" element={<AlbumPage/>}/>
                    <Route path="search/type=:searchedType/userSearch=:searchInput" element={<RequireAuth><SearchPage/></RequireAuth>}></Route>
                    <Route path="artists/top-trending" element={<TopTrendingArtistPage/>}></Route>
                    <Route path="albums/top-trending" element={<TopTrendingAlbumPage/>}></Route>
                    <Route path="songs/top-trending" element={<TopTrendingSongPage/>}></Route>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </AuthProvider>
    );
}

export default App;
