import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayouts from './layouts/MainLayouts';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import FullGame from './components/FullGame/FullGame';

import './scss/app.scss';

const App = () => (
  <Routes>
    <Route path='/' element={<MainLayouts/>}>
      <Route path='' element={<Home/>}/>
      <Route path='Cart/*' element={<Cart/>}/>
      <Route path='Game/:id' element={<FullGame/>}/>
    </Route>
  </Routes>
);

export default App;
