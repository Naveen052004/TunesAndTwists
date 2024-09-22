const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node')
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config();
const { wait } = require('@testing-library/user-event/dist/utils');

// console.log(process.env)
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
// var redirect_uri = 'http://localhost:5000/callback';
var redirect_uri = 'http://localhost:3000/'
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/login', (req, res) => {
    //   var state = generateRandomString(16);
    var scope = 'streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state user-read-recently-played';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: '34fFs29kd09'
        }));
});

app.get('/callback', async (req, res) => {
    // const code = req.query.code || null;
    const code = req.headers['code'];
    const state = req.headers['state'];
    // console.log("This is code received : " + code);
    // console.log("This is code received : " + state);
    // const state = req.query.state || null;
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    if (state === null) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        try {
            // console.log(querystring.stringify({
            //     code: code,
            //     redirect_uri: redirect_uri,
            //     grant_type: 'authorization_code'
            // }))
            // console.log(code);
            // Exchange authorization code for access token using axios
            const response = await axios.post(tokenUrl, querystring.stringify({
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
                }
            });
            const access_token = response.data.access_token;
            const refresh_token = response.data.refresh_token;
            // console.log("Access Token " + access_token)
            const data = {
                access_token: access_token,
                refresh_token: refresh_token,
                code: code
            };
            res.json({
                access_token: access_token,
                refresh_token: refresh_token,
                code: code
            });
            // res.redirect('http://localhost:3000/' +
            //     querystring.stringify({
            //         access_token: access_token,
            //         refresh_token: refresh_token,
            //         code:code
            //     }));
        } catch (error) {
            console.log(error)
            // console.log(code)
        }
    }
});

app.listen(5000, () => {
    console.log("Listening on port 5000");
})