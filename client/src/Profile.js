import React from 'react'
import axios from "axios"
import { useState } from "react"
import { Button, Container, Card, Row } from "react-bootstrap"
import "./styles/Profile.css"

let imageURL = "https://i.scdn.co/image/ab6775700000ee857371d22a0591eb5204651c34";

function Profile({ setScreen }) {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <Container>
      <Row style={{ height: "10vh" }}>
        <Button style={{ float: "left", margin: "5px" }} onClick={() => { setScreen("") }}>Back</Button>
        {/* <p><strong>User profile</strong></p> */}
      </Row>
      <Row>
        <Card className={"card-grid"}>
          <Card.Img className={"card-img"} variant="bottom" src={user.user.image_url} />
          <Card.Body>
            <Card.Title><strong>{user.user.display_name}</strong></Card.Title>
            <Card.Text>
              <p>ID: {user.user.id}</p>
              <p>Email: {user.user.email}</p>
              <p>Country: {user.user.country}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default Profile