import React, { useEffect, useRef, useState } from 'react'
import './Flappy.css'
import styled from 'styled-components'



const Home = styled.div`
outline: none;
`

const OBJ_WIDTH = 54;
const OBJSPEED = 6;
const Backgroud = styled.div`
    // background-image: url('/flappy/cover.jpg');
    background-repeat: no-repeat;
    height: 590px;
    margin: 10px;
    border:10px double white;
    border-radius:10px;
    background-size: 931px 590px;
    position: relative;
    overflow:hidden;
`

const Bird = styled.div`
    // border: 2px solid black;
    position: absolute;
    background-image:url('/flappy/yellowbird-upflap.png');
    height: 28px;
    width: 37px;
    border-radius: 15px;
    background-repeat: no-repeat;
    top:${props => props.top}px;
    left:${props => props.left}px;
`

const Start = styled.button`
    left: 346px;
    top: 244px;
    position: absolute;
    // color: black;
    // border: 2px solid black;
    // border-radius: 30px;
    z-index:1;
    outline:none;
`
const Up = styled.div`
    position: relative;
    left:${props => props.left}px;
    background-image: url('/flappy/pipe-green.png');
    // background-repeat: no-repeat;
    background-size:54px 400px;
    width: 54px;
    height:${props=>props.height}px;
    transform:rotate(180deg);
    filter:invert(1);
`;
const Down = styled.div`
    position: absolute;
    bottom:0px;
    left:${props => props.left}px;
    background-image: url('/flappy/pipe-green.png');
    // background-repeat: no-repeat;
    background-size:54px 400px;
    width: 54px;
    filter:invert(1);
    height:${props=>props.height}px;
`;

function Flappy() {
    const gap = 150;
    const [score, setScore] = useState(0);
    const [birdPos, setBirdPos] = useState(290);
    const [playing, setPlaying] = useState(false);
    const [objHeight,setObjectHeight] = useState(200);
    const [leftPos,setLeftPos] = useState(870);
    const [hScore,setHScore] = useState(0);
    const newGame = useRef(null);
    const homeRef = useRef(null);
    function focus(){
        if(!playing)
            newGame.current.focus();
    }
    useEffect(()=>{
            focus();
    })
    useEffect(() => {
        let objVal;
        if(playing && leftPos >= -OBJ_WIDTH) {
            objVal = setInterval(() =>{
                setLeftPos((leftPos)=>leftPos-OBJSPEED)
            },25);
        }
        else if(playing){
            setLeftPos(900);
            setObjectHeight(Math.floor(Math.random()*(590-gap)));
            setScore((score) => score + 1);
        }
        return () => clearInterval(objVal);
    });

    useEffect(() => {
        if (playing) {
            if (birdPos > 587 - 28) {
                setPlaying(false);
                return;
            }
            let interval = setInterval(() => {
                setBirdPos((birdPos) => birdPos + 5);
            },25)
            return () => clearInterval(interval)
        }
    });

    useEffect(()=>{
        let hit = birdPos>=0 && (birdPos<=objHeight || birdPos>=objHeight+gap);
        if(hit && leftPos <= (100+37) && leftPos>=55) {
            setPlaying(false);
        }
    })
    const handleClick = () => {
        if (playing) {
            if (birdPos - 50 - 28 > 0)
                setBirdPos((birdPos) => birdPos - 50);
            else {
                setBirdPos(0);
                setPlaying(false);
            }
        }
    }
    const startPlay = () => {
        homeRef.current.focus();
        setBirdPos(290);
        setHScore((hScore)=>score>hScore?score:hScore)
        setScore(0);
        // setObjectHeight(200);
        setLeftPos(870);
        setPlaying(true);
    }
    return (
        <Home tabIndex={0} onClick={handleClick} onKeyDown={(e)=>e.key === ' '?handleClick():null} ref={homeRef}>
            <Backgroud onClick={focus}>
                <h3 className='flappy'>Score : {score} High Score : {hScore}</h3>
                {!playing ? <Start ref={newGame} onKeyDown={(e)=>e.key ===' '?startPlay():null}  onClick={startPlay} style={{userSelect:'none'}}>
                        Click Here to Start
                </Start> : null}
                <Up height = {objHeight} width = {20} left= {leftPos} >
                </Up>
                <Down height = {590-objHeight-gap} width = {20} left= {leftPos} ></Down>
                <Bird top={birdPos} left={100}></Bird>
            </Backgroud>
        </Home>
    )
}

export default Flappy
