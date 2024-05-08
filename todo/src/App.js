import './App.css';
import { Main } from './Main';
import { createContext, useState } from 'react';

export const authContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);
  return (
    <>
     <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
     <Main />
     </authContext.Provider>
    
    </>
  );
}

export default App;
