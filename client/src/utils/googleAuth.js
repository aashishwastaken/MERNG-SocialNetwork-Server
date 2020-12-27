import React, { useContext } from 'react'
import * as queryString from 'query-string';
import axios from 'axios';
import {AuthContext} from '../context/auth';

async function getAccessTokenFromCode(code) {
    const { data } = await axios({
        url: 'https://oauth2.googleapis.com/token',
        method: 'post',
        data: {
            client_id: '386517099188-b1stp2vpr40q7k68uuoquifgfgohkju7.apps.googleusercontent.com',
            client_secret: 'K2wiFL1kXtvVrypip4Z4S3Qj',
            redirect_uri: 'http://localhost:3000/authenticate/google',
            grant_type: 'authorization_code',
            code,
        },
    });
    console.log(data); // { access_token, expires_in, token_type, refresh_token }
    return data;
}


async function getGoogleUserInfo(access_token) {
    const { data } = await axios({
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        method: 'get',
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
    console.log(data); // { id, email, given_name, family_name }

    return data;
}

// function parseUrl(urlParams){

//         console.log(`An error occurred: ${urlParams.error}`);
//       //return (<div>ERROR</div>);

// }

async function Br(props,context) {
    console.log('b')

    const urlParams = queryString.parse(window.location.search);

    if (urlParams.error) {
        console.log(`An error occurred: ${urlParams.error}`);
    } else {
        try {
            var accessToken = await getAccessTokenFromCode(urlParams.code);
            var userData = await getGoogleUserInfo(accessToken.access_token);
            
            context.login({id:userData.id,
                           username:userData.name,
                           email:userData.email,
                           token:accessToken.access_token });
            props.history.push('/');
            console.log(userData);

        }
        catch (err) {
            console.warn(`the warn is:${err}`);
        }
        console.log(`The code is: ${urlParams.code}`);
    }
}




export default function GoogleAuth(props) {
    let context=useContext(AuthContext);
    Br(props,context);
    return (
        <div>
            Loading....
        </div>
    )
}


