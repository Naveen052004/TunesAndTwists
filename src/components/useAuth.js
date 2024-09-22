import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken,setAccessToken] = useState()
    const [refreshToken,setRefreshToken] = useState()
    const [expiresIn,setExpiresIn] = useState()
    useEffect(() =>{
      axios.get('http://localhost:5000/callback',{
        code:code
      })
      .then(res=>{
        console.log("Naveen");
      }).catch((error)=>{
        console.log("Error");
        // window.location="/"
      })  
    },[code])

}
