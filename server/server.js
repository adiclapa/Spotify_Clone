require("dotenv").config()
const express = require("express")
const response = express.response;
const axios = require("axios");
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")
const User = require('./mongodb/User')
const Post = require('./mongodb/Post')
const mongoose = require('mongoose');
const uri = "mongodb+srv://user:user@cluster0.t5d1q.mongodb.net/music-app?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
});

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })
  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

app.post("/profile", (req, res) => {
  axios.get(
    "https://api.spotify.com/v1/me",
    {
      headers: {
        Authorization: "Bearer " + req.body.accessToken,
      },
    }).then(response => {
      const user = {
        country: response.data.country,
        display_name: response.data.display_name,
        email: response.data.email,
        id: response.data.id,
        image_url: response.data.images[0].url,
      }
      // console.log(user);
      res.json({ user });
    }).catch((error) => {
      console.log(error);
    })
});

app.post("/register",async (req, res) => {
  const check = await User.findOne({ Username: req.body.Username });
  if (check) {
    res.send('User already exists!')
  } else {
    const user = new User({
      Username: req.body.Username,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: req.body.Password
    });
    user.save()
      .then(() => { res.send('User added successfully!') })
      .catch((err) => console.log(err));
  }
});



app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
  res.json({ lyrics })
})

app.post("/liked", (req, res) => {
  axios.get(
    "https://api.spotify.com/v1/me/tracks",
    {
      headers: {
        Authorization: "Bearer " + req.body.accessToken,
      },
    }).then(response => {
      // console.log(response.data.items);
      res.json(response.data.items)
    })
    .catch((error) => {
      console.log('Error getting user tracks:', error.message)
    })
})

app.post('/posts', function (req, res) {
  // console.log(req.body.userID);
  Post.find({ userID: req.body.userID }).then(posts => res.send(posts));
});

app.post('/postsadd', function (req, res) {
  const post = new Post({
    userID: req.body.userID,
    title: req.body.title,
    description: req.body.description
  })
  post.save().then(response => { res.send('Post added succefull') });
});

app.post('/postsdelete', async function (req, res, next) {
  const post = await Post.findOne({ userID: req.body.userID, title: req.body.title })
  post.delete();
  res.send('Post deleted succefull');
});

app.listen(3001)
