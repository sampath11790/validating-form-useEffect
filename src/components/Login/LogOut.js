import React,{useContext} from "react";
import AuthContext from "../../context/Auth-Context";
function LogOut(){
    const ctx=useContext(AuthContext)
return(
    <div>
       <button onClick={ctx.logoutHandler}>logOut</button> 
    </div>
)
}
export default LogOut