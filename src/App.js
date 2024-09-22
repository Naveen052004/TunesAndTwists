import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useEffect, useState } from 'react';
import Afterlogin from './components/Afterlogin';
import Login from './components/Login';
const urlParams = new URLSearchParams(window.location.search);

const accessToken = urlParams.get('access_token');
const refreshToken = urlParams.get('refresh_token');
// const code = urlParams.get('code');
function App() {
  // const  url = window.location.href;
  // const a = url.split('/')
  // console.log(a[a.length - 1])
  // console.log("This is me" + a.get('access_token'))
  // console.log(location)
  
  const [code, setCode] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get('code');
    setCode(codeParam);
  }, []);
  return<>
  {code?(<Afterlogin></Afterlogin>):<Login></Login>}
  
  </> 

}

export default App;
