import React from 'react'
import {Component, Container} from 'react-bootstrap'

// const auth_url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state&state=34fFs29kd09`
// var client_id = 'COPY YOUR CLIENT ID';
var redirect_uri = 'http://localhost:5000/login';
var scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state';
    // const auth_url = ('https://accounts.spotify.com/authorize?' +
    //     querystring.stringify({
    //         response_type: 'code',
    //         client_id: client_id,
    //         scope: scope,
    //         redirect_uri: redirect_uri,
    //         state: '34fFs29kd09'
    //     }));

export default function Login() {
  return (
    <>
    <h1 style={{fontSize:'120px'}}>Welcome</h1><br/>
    <div style={{display:'flex',justifyContent:'center',alignContent:'center'}}>
    <div className='watch-container'>
        <a href={redirect_uri} className='btn btn-success btn-lg'>Click to Login</a>
    </div>
    </div>
    {/* <Container className='d-flex justify-content-center align-items-center custom-container' style={{minHeight:"75vh"}}>
        <a href={redirect_uri} className='btn btn-success btn-lg'>Click to Login</a>
    </Container> */}
    </>
  );
}