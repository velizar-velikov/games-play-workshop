import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import GameCreate from './components/game-create/GameCreate.jsx';
import GamesCatalog from './components/games-catalog/GamesCatalog.jsx';
import GameDetails from './components/game-details/GameDetails.jsx';
import GameEdit from './components/game-edit/GameEdit.jsx';
import Logout from './components/logout/Logout.jsx';
import { UserContextProvider } from './contexts/UserContext.jsx';
import RouteGuard from './components/common/RouteGuard.jsx';
import PrivateGuard from './components/common/PrivateGuard.jsx';

function App() {
    return (
        <div id="box">
            <UserContextProvider>
                <Header />
                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/games" element={<GamesCatalog />} />
                        <Route path="/games/:gameId/details" element={<GameDetails />} />

                        <Route element={<PrivateGuard />}>
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/games/create" element={<GameCreate />} />
                            <Route path="/games/:gameId/edit" element={<GameEdit />} />
                        </Route>
                        {/*
                        different way of using a route guard 
                        <Route
                            path="/games/create"
                            element={
                                <RouteGuard>
                                    <GameCreate />
                                </RouteGuard>
                            }
                        /> */}
                    </Routes>
                </main>
            </UserContextProvider>
        </div>
    );
}

export default App;
