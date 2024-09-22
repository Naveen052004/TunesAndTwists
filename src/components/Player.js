import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
export default function Player({ accessToken, trackUri }) {
  return (
    <div style={{ borderRadius: '10px' }}>
      <SpotifyPlayer styles={{ bgColor: '#66A5AD', color: '#EDF4F2'}} token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []} />
    </div>
  )
}
