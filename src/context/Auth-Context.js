import React,{useState,useEffect} from "react";

const AuthContext=React.createContext({
    isLoggedIn:false
})

export const AuthContextProvider=(props)=>{
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


    return<AuthContext.Provider value={{
        isLoggedIn:isLoggedIn,
        loginHandler:loginHandler,
        logoutHandler:logoutHandler
     }}>{props.children}</AuthContext.Provider>
}
export default AuthContext;