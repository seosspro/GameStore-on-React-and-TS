import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';

import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className='wrapper'>
            <SearchContext.Provider value={{ searchValue, setSearchValue }}>
                <Header />
                <Routes>
                    <Route path='/*' element={<Home />} />
                    <Route path='/Cart/*' element={<Cart />} />
                </Routes>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
