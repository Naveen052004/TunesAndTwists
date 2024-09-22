import React from 'react'

function PlaylistsComponent({track,getPlaylists}) {
  return (
    <div className='d-flex m-2 align-items-center' style={{cursor:'pointer'}} onClick={()=>getPlaylists(track.uri)}>
        <img src={track.albumImage} style={{height:'64px',width:'64px'}} alt="" />
        <div className='ml-3'>
        <div>{track.title}</div>
        {/* <div className='text-muted'>{track.artist} </div> */}
        </div>
    </div>
  )
}

export default PlaylistsComponent