import { Routes, Route } from 'react-router-dom';

import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import Login from './components/login/Login.jsx';
import Register from './components/register/Register.jsx';
import GameCreate from './components/game-create/GameCreate.jsx';
import GamesCatalog from './components/games-catalog/GamesCatalog.jsx';
import GameDetails from './components/game-details/GameDetails.jsx';
import GameEdit from './components/game-edit/GameEdit.jsx';
import UserContext from './contexts/UserContext.js';
import { useState } from 'react';

function App() {
    const [currentUser, setCurrentUser] = useState({});

    const changeAuthState = (state) => {
        setCurrentUser(state);
    };

    const contextData = {
        email: currentUser.email,
        accessToken: currentUser.accessToken,
        isAuthenticated: Boolean(currentUser.email),
        changeAuthState,
    };

    return (
        <div id="box">
            <UserContext.Provider value={contextData}>
                <Header />
                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/games" element={<GamesCatalog />} />
                        <Route path="/games/create" element={<GameCreate />} />
                        <Route path="/games/:gameId/details" element={<GameDetails />} />
                        <Route path="/games/:gameId/edit" element={<GameEdit />} />
                    </Routes>
                </main>
            </UserContext.Provider>
        </div>
    );
}

export default App;
