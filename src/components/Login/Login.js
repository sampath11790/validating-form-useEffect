import React, { useState, useEffect,useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
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
  const submitHandler = (event) => {
    event.preventDefault();
   
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
             collegeIsValid=== false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">college name</label>
          <input
            type="college"
            id="college"
            value={enteredcollegename}
            onChange={collegNameChangeHandler}
            onBlur={validaCollegeNameHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit"  disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
