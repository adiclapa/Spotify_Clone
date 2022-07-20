import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import * as Icons from "react-bootstrap-icons"
import { Container, Row, Col } from "react-bootstrap"
import Home from './Home';
import Profile from './Profile';
import Activity from './Activity'
import Liked from './Liked';
import axios from "axios";

const clientId = "7d38d4edadf84fdeb9afb9f2f779a835";


export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [screen, setScreen] = useState("");
  useEffect(() => {
    console.log(accessToken);
    if (!accessToken)
      return;

    axios.post("http://localhost:3001/profile/", { accessToken: accessToken })
      .then(res => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
      })
  }, [accessToken])

  const buttons = [
    {
      icon: <Icons.PersonFill style={{ height: 200, width: "100%" }}></Icons.PersonFill>,
      title: "Profile",
      onClick: () => { setScreen("profile") }
    },
    {
      icon: <Icons.House style={{ height: 200, width: "100%" }}></Icons.House>,
      title: "Home",
      onClick: () => { setScreen("home") }
    },
    {
      icon: <Icons.HandThumbsUp style={{ height: 200, width: "100%" }}></Icons.HandThumbsUp>,
      title: "Liked songs",
      onClick: () => { setScreen("like") }
    },
    {
      icon: <Icons.Activity style={{ height: 200, width: "100%" }}></Icons.Activity>,
      title: "Activity",
      onClick: () => { setScreen("activity") }
    },
  ]
  const render = () => {
    if (screen) {
      if (screen === "profile") {
        return <Profile setScreen={setScreen}></Profile>
      }
      if (screen === "home") {
        return <Home setScreen={setScreen} accessToken={accessToken}></Home>
      }
      if (screen === "like") {
        return <Liked setScreen={setScreen} accessToken={accessToken}></Liked>
      }
      if (screen === "activity") {
        return <Activity setScreen={setScreen} accessToken={accessToken}></Activity>
      }
    }
    else {
      // eslint-disable-next-line no-lone-blocks
      {
        return <Container>
          <Row className="justify-content-md-center" style={{ textAlign: "center", marginTop: 20 }} >
            <h1>Welcome to your MusicApp</h1>
          </Row>
          <Row md={5} xs={1} style={{ marginTop: 30 }}>
            {
              buttons.map((e) => {
                return <Col style={{ height: 300, width: 300, boxShadow: "1px 20px 20px 1px grey", margin: 20, textAlign: "center" }} onClick={() => { e.onClick() }}>
                  <Row className="justify-content-md-center" >
                    {e.icon}
                  </Row>
                  <Row className="justify-content-center">
                    <h3 style={{textAlign:"center"}}>{e.title}</h3>
                  </Row>
                </Col>
              })
            }
          </Row>
        </Container>

      }
    }
  }
  return (
    <div className="App">
      {render()}
    </div>
  )
}
