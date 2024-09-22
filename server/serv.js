const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node')

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.post('/login', (req, res)=> {
    var credentials = {
        clientId: 'b1d5d0858dbd4c4681fa53a2449b054f',
        clientSecret: '425a1a33a1b24688bee44b7ef3e67646',
        redirectUri: 'http://localhost:3000'
      };
    const code = req.body.code
    console.log("Code is \n"+code)
    const spotifyApi = new SpotifyWebApi(credentials);

    spotifyApi.authorizationCodeGrant(code).then(data=>{
        res.json({
            accessToken:data.body[access_token],
            refreshToken:data.body[refresh_token],
            expiresIn:data.body[expires_in],
        });
    }).catch((error)=>{
        console.log(error);
        res.sendStatus(400);
    });
    
})

app.listen(5000,()=>{
    console.log("Listening on port 5000");
})