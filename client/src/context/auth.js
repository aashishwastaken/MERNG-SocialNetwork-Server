import React, {createContext, useReducer} from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext=createContext({
    user:null,
    login:()=>{},
    logout:()=>{}
});

let initialState={user:null};

if(localStorage.getItem('jwtToken')){
    const decodedToken=jwtDecode(localStorage.getItem('jwtToken'));
    if(decodedToken.exp*1000<Date.now()){
        localStorage.removeItem('jwtToken');
    }else{
        initialState.user=decodedToken;
    }

}

const AuthReducer=(state,action)=>{
    switch(action.type){
        case 'LOGIN':return {...state,user:action.payload};
        case 'LOGOUT':return {...state, user:null};
        default:return state;
    }
}

function AuthProvider(props){
    const [state,dispatch]=useReducer(AuthReducer,initialState);
    function login(userData){
        localStorage.setItem('jwtToken',userData.token);
        dispatch({
            type:'LOGIN',
            payload:userData
        });
    }
    function logout(){
        localStorage.removeItem('jwtToken');
        dispatch({type:'LOGOUT'});
    }

    return (<AuthContext.Provider {...props} value={{user:state.user, login,logout}} />);

}

export {AuthContext, AuthProvider};