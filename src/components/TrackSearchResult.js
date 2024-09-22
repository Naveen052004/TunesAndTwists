import React from 'react'
import { IoMdAdd } from "react-icons/io";

export default function TrackSearchResult({track,chooseTrack,addToQueue}) {
    const handlePlay = ()=>{
        chooseTrack(track);
        // console.log(track);
    }
  return (
    <div className='d-flex m-2 align-items-center'  >
        <img src={track.albumImage} style={{height:'64px',width:'64px'}} alt="" />
        <div className='ml-2' style={{width:'80%'}}>
        <div onClick={handlePlay} style={{cursor:'pointer'}}>{track.title} </div>
        {/* <div className='text-success'>{track.artist} </div> */}
        <div style={{color:'white', fontSize:'small',textAlign:'start', display:'inline-block'}}>{track.artist} </div>
        </div>
        <button style={{outline:'none',border:'none'}} onClick={()=>{addToQueue(track.uri)}}><IoMdAdd /> </button> 
    </div>
  )
}
