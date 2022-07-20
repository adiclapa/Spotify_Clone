import React from "react"
import { Link } from "react-bootstrap-icons";
import Register from "./Register";
import './styles/Login.css'

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=7d38d4edadf84fdeb9afb9f2f779a835&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login({ setScreen }) {

  return (
    <div className="login">
      <div>
        <img src="https://img.icons8.com/cute-clipart/64/000000/musical.png" alt=":(" />
        <div className="logo-text">Music</div>
      </div>


      <a href={AUTH_URL} >
        Login With Spotify
      </a>
      <br></br>
      <button onClick={() => { setScreen("register") }} className="register-button">No account?</button>

    </div>
  )
}
