import React, { useState } from 'react'
import '../App.css'
import Switch from '@mui/material/Switch';
function Nav({changeGame}) {
  const [mode,setMode] = useState(false);
  const Game = (game) => {
    changeGame(game)
  };
  const getValue = (e) => {
    setMode(e.target.checked)
    console.log(mode)
  }
  return (
    <>
    <div className='NavDiv'>
    <ul className='Navi'>
        <li><button onClick={()=>Game(1)}> Magic Memory</button></li>
        <li><button onClick={()=>Game(2)}>Tic Tac Toe</button> </li>
        <li><button onClick={()=>Game(3)}>Flappy Bird</button></li>
        <li><button onClick={()=>Game(4)}> SpeedType</button></li>
        {/* <li><button onClick={()=>Game(5)}> Ping Pong</button></li> */}
        <li style={{position:'absolute',float:'right',right:'0'}}><Switch onClick={getValue}  id='mode'/>{mode?'Dark':'Light'}</li>
    </ul>
    </div>
    </>
  )
}

export default Nav