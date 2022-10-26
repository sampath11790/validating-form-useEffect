import React, { useState, useEffect,useReducer,useContext,useRef} from 'react';
import AuthContext from '../../context/Auth-Context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import UserInput from '../UI/UserInput/UserInput';
const InitalState={
  value:'',
  isValid:false
}
//EMAIL REDUCER
function emailReducer(state,action){
  if(action.type==='USER_INPUT'){
    return{value:action.val,isValid:action.val.includes('@')}
  }
  if(action.type==="INPUT_BLUR"){
    return {value:state.value,isValid:state.value.includes('@')}
  }
  return{value:'',isValid:false}

}
//PASSWORD REDUCER
function passwordReducer(state,action){
if(action.type==="INPUT_PASSWORD"){
  return{value:action.val,isValid:action.val.trim().length > 6}
}
if(action.type==="INPUT_BLUR_PASSWORD"){
  return {value:state.value,isValid:state.value.trim().length > 6}
}
return{value:'',isValid:null}

}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredcollegename, setEnteredCollegename] = useState('');
  const [collegeIsValid, setcollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailRef=useRef()
  const passwordRef=useRef()
  const collegeRef=useRef()

 
// useEffect(()=>{
//   const handler=setTimeout(()=>{
//   // console.log("time out set")
//     setFormIsValid(
//       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredcollegename.trim().length > 4
//     );
//   },1000)
// return(()=>{
//   // console.log("time out clear")
//   clearTimeout(handler)
// })
  
// },[enteredEmail,enteredPassword])
 const[emailState,dispatchEmail]=useReducer(emailReducer,InitalState)
 const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null})
const ctx=useContext(AuthContext)
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT',val:event.target.value})
  
    // event.target.value.includes('@') && 
    // enteredPassword.trim().length > 6 && 
    // enteredcollegename.trim().length > 4
    
  };
  const collegNameChangeHandler=(event)=>{
   // console.log("college change handler")
    setEnteredCollegename(event.target.value)
}

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:"INPUT_PASSWORD",val:event.target.value})
    setFormIsValid(
      passwordState.value.trim().length > 6 && 
      emailState.isValid&&
      enteredcollegename.trim().length > 4 
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes('@'));
    dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:"INPUT_BLUR_PASSWORD"})
    //setPasswordIsValid(passwordState.value.trim().length > 6);
  };
  const validaCollegeNameHandler = () => {
    //console.log('is valid college')
    setcollegeIsValid(enteredcollegename.trim().length > 4);
  };

  const{isValid:emailIsvalid}=emailState
  const{isValid:passwordIsValid}=passwordState
  const submitHandler = (event) => {
    event.preventDefault();
   if(emailIsvalid&& passwordIsValid){
    ctx.loginHandler(emailState.value, passwordState.value);
   }
   else if(!emailIsvalid){
    emailRef.current.focus()
   }else{
    passwordRef.current.focus()
   }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <UserInput
        ref={emailRef}
        isValid={emailState.isValid}
        type="email"
        id="email"
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        label='E-Mail'
        />
         <UserInput
         ref={collegeRef}
        isValid={collegeIsValid}
        type="college"
        id="college"
        value={enteredcollegename}
        onChange={collegNameChangeHandler}
        onBlur={validaCollegeNameHandler}
        label="college name"
        />
        <UserInput
        ref={passwordRef}
        isValid={passwordState.isValid}
        type="password"
        id="password"
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        label="password"
        />
     <div className={classes.actions}>
          <Button type="submit" >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
