
import 'bootstrap/dist/css/bootstrap.min.css';
import Dash from './Dash';
import Magic from './Magic';
import '../App.css';
import Nav from './Nav';
import {useState } from 'react';
import Tic from './Tic';
import SpeedType from './SpeedType';
import Flappy from './Flappy';
function Afterlogin() {
    // const  url = window.location.href;
    // const a = url.split('/')
  
    // console.log(a[a.length - 1])
    // console.log("This is me" + a.get('access_token'))
  
    // console.log(location)
  
    const [game,setGame] = useState(1)
    const url = (window.location.href);
    const changeGame = (num) => {
      setGame(num);
    };
    return <>
      <Nav changeGame = {changeGame}>
        <h1>Nav Bar</h1>
      </Nav>
      <div className='parentdiv'>
        <div className='div1'>
          {/* <Nav changeGame = {changeGame}/> */}
          {/* {game === 0 && } */}
          {game === 1 && <Magic/>}
          {game === 2 && <Tic/>}
          {game === 3 && <Flappy/>}
          {game === 4 && <SpeedType/>}
          {/* {game === 5 && <Pong/>} */}
        </div>
        <div className='div2 '>
            {<Dash />}
        </div>
      </div>
    </>
    // return code ? <Dash code={code}/>:<Login/>
  }
  
  export default Afterlogin;
  