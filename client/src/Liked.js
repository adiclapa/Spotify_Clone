import React from 'react'
import axios from "axios"
import { useState, useEffect } from "react"
import { Button, Container, Card, Row, Col } from "react-bootstrap"
import Player from "./Player"
import './styles/Liked.css'

const playlistID = "4zNe1IHLOtHAttVfkxUoWk";
const tracks = [];

function Liked({ accessToken, setScreen }) {
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  const importTracks = () => {
    axios.post("http://localhost:3001/liked/", { accessToken: accessToken })
      .then(res => {
        setTracks(res.data);
      })
  }


  useEffect(() => {
    importTracks();
  }, []);
  console.log(tracks[0]);

  const TrackList = ({ tracks }) => (
    <ul>
      {
        tracks.map(e => (
          <li><Row onClick={()=>setPlayingTrack(e.track)}><Col><img src={e.track.album.images[2].url}></img></Col> <Col style={{ textAlign: "left" }}>{e.track.artists[0].name} - {e.track.name}</Col><Col className='list-cell-right'>{Math.floor(e.track.duration_ms / 60000)}:{((e.track.duration_ms % 60000) / 1000).toFixed(0)}</Col></Row></li>
        ))
      }
    </ul>
  );

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }} fluid>

      <Row><Button style={{ left: 5, top: 5, margin:5 }} onClick={() => { setScreen("") }}>Back</Button></Row>

      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        <TrackList tracks={tracks} />
      </div>
      <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
    </Container>
  )
}

export default Liked