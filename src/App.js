import React, { useState  , useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/Auth-Context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userstoredData=localStorage.getItem('setval')
  useEffect(()=>{
    if(userstoredData==='1'){
      setIsLoggedIn(true)
    }
},[])


  const loginHandler = (email, password,college) => {
    localStorage.setItem('setval',1)
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    console.log('logout')
    setIsLoggedIn(false);
  };

  return (
   
      <AuthContext.Provider value={{
        isLoggedIn:isLoggedIn,
        logoutHandler:logoutHandler

      }}>
      <MainHeader/>
      
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
        
      </main>
     
      </AuthContext.Provider>
      
   
  );
}

export default App;
