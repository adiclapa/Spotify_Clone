import { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import { Button, Row, Card, Col, Modal, Form } from 'react-bootstrap'
import * as Icons from 'react-bootstrap-icons'

export default function Activity({ setScreen }) {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [notes,setNotes]=useState([
    ]);
    const importPosts=(id)=>
    {
        axios.post("http://localhost:3001/posts/", {userID:id}).then(response=>{
            console.log("import ID:" + id);
            response.data.map(note=>{
                setNotes([...notes,note]);
            })
        })
    }
    const deletePost=(id, name)=>{
        axios.post("http://localhost:3001/postsdelete/",{userID:id, title:name}).then(response=>{
            console.log(response.data);
            setNotes([]);
        })
    }
    const addPost=(id,name,description)=>{
        axios.post("http://localhost:3001/postsadd/",{userID:id, title:name, description:description}).
        then(response=>{
            console.log(response.data);
            importPosts(user.user.id);
        })
       
    }

    useEffect(()=>{
        console.log(user.user.id)
        importPosts(user.user.id);
    },[]);
    return <>
        <Container>
            <Button style={{ position: "absolute", left: 5, top: 5 }} onClick={() => { setScreen("") }}>Back</Button>
            <Button style={{ position: "absolute", bottom: 50, right: 50, height: 40, width: 40, borderRadius: "50%" }} onClick={() => { handleShow() }}><Icons.Plus></Icons.Plus></Button>
            <Row style={{ textAlign: "center", marginTop: 40 }}>
                <h1>My Notes</h1>
            </Row>
            <Row style={{ margin: 40, justifyContent: "center" }}>
                {
                    notes.map((e) => {
                        return <Card
                            bg={'danger'}
                            text={'black'}
                            style={{ width: '30rem', boxShadow: "2px 20px 20px 2px grey", margin: 20 }}
                        >
                            <Card.Header><Row >
                                <Col md="auto"><h3>{e.title}</h3></Col>
                                <Col><Button style={{ height: 50, width: 50 }} onClick={() => {
                                    deletePost(user.user.id, e.title);
                                }}><Icons.Eraser></Icons.Eraser></Button></Col>
                            </Row></Card.Header>
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Text>
                                    {e.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    })
                }
            </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    addPost(user.user.id, e.target[0].value, e.target[1].value)
                    handleClose();

                }}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </>;
}