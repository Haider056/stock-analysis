import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SidePanel from './Sidepanel';
import Login from './login';
import Register from './register';
import LoggedIn from './components/loggedIn';
import Stock from './components/stock';
import ExchangeRate from './components/exchangeRate';
import WatchList from './components/watchList';
import SelectiveSearch from './components/selectedWatch';
import CurrencyConversion from './components/currencyconversion';
import MajorGainers from './components/MajorGainer';
import MajorLosers from './components/MajorLosers';
import StockNews from './components/News'
// Create the AuthContext
export const AuthContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emaill ,setEmaill] = useState(null)

  const login = () => {

    setIsLoggedIn(true);
  };

  const logout = () => {
 
    setIsLoggedIn(false);
  };

  const mailChange= (prop)=>{
    setEmaill(prop)

  }

  return (
    <BrowserRouter>
      <div className="app">
        <AuthContext.Provider value={{ isLoggedIn, emaill, login, logout,mailChange }}>
          <SidePanel />
          <Routes>
            {/* Other routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/loggedIn" element={<LoggedIn />} />
            <Route path="/stocks" element={<Stock />} />
            <Route path="/exch" element={<ExchangeRate />} />
            <Route path="/curren" element={<CurrencyConversion />} />
            <Route path="/gain" element={<MajorGainers />} />
            <Route path="/lose" element={<MajorLosers />} />
            <Route path="/news" element={<StockNews />} />
            <Route path='/Watch' element={<WatchList/>}/> 
            <Route path='/ss/:symbol/:detail' element={<SelectiveSearch/>}/> 
          </Routes>
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
