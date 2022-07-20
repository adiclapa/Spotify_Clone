import { useState } from 'react';
import axios from 'axios'
import './styles/Register.css'
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default function Register({ setScreen }) {

    const [ModalTitle, setTitle] = useState("");
    const [ModalBody, setBody] = useState("");

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (checked) =>{
        if(checked === true){
            setTitle("OK");
            setTimeout(() => {  setScreen(""); }, 5000);     
        }
        setShow(true);
    } 

    const [Username, setUsername] = useState('');
    const [LastName, setLastName] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [PasswordConfirm, setPasswordConfirm] = useState('');


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "username") {
            setUsername(value);
        }
        if (id === "firstName") {
            setFirstName(value);
        }
        if (id === "lastName") {
            setLastName(value);
        }
        if (id === "email") {
            setEmail(value);
        }
        if (id === "password") {
            setPassword(value);
        }
        if (id === "confirmPassword") {
            setPasswordConfirm(value);
        }

    }

    const handleSubmit = (Username, FirstName, LastName, Email, Password, PasswordConfirm) => {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
            setTitle("Error!");
            setBody("You have entered an invalid email address!");
            handleShow();
            return;
        }
        if(Password !== PasswordConfirm){
            setTitle("Error!");
            setBody("The passwords are different!");
            handleShow();
            return;
        }
        axios.post("http://localhost:3001/register/", { Username: Username, FirstName: FirstName, LastName: LastName, Email: Email, Password: Password })
            .then(response => {
                if (response.data === 'User added successfully') {
                    setTitle("Error!");
                    setBody(response.data);
                    handleShow(true);
                } else {
                    setTitle("Error!");
                    setBody(response.data);
                    handleShow();
                }
            })

    }

    return (
        <div style={{ width: "100vw" }}>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>{ModalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ModalBody}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
                <div className="row">
                    <div className="btn-column"><Button className="back-button" onClick={() => { setScreen("") }}>Back</Button></div>
                    <div className="column"><h3>Welcome</h3></div>
                    <div className="column"></div>
                </div>
            
            <div className="form">
                <div className="form-body">
                    <div className="username">
                        <label className="form__label" for="username">Username</label>
                        <input className="form__input" type="text" id="username" onChange={(e) => handleInputChange(e)} placeholder="Username" />
                    </div>
                    <div className="firstname">
                        <label className="form__label" for="firstName">First Name </label>
                        <input className="form__input" type="text" id="firstName" onChange={(e) => handleInputChange(e)} placeholder="First Name" />
                    </div>
                    <div className="lastname">
                        <label className="form__label" for="lastName">Last Name </label>
                        <input type="text" name="" id="lastName" className="form__input" onChange={(e) => handleInputChange(e)} placeholder="LastName" />
                    </div>
                    <div className="email">
                        <label className="form__label" for="email">Email </label>
                        <input type="email" id="email" className="form__input" onChange={(e) => handleInputChange(e)} placeholder="Email" />
                    </div>
                    <div className="password">
                        <label className="form__label" for="password">Password </label>
                        <input className="form__input" type="password" id="password" onChange={(e) => handleInputChange(e)} placeholder="Password" />
                    </div>
                    <div className="confirm-password">
                        <label className="form__label" for="confirmPassword">Confirm Password </label>
                        <input className="form__input" type="password" id="confirmPassword" onChange={(e) => handleInputChange(e)} placeholder="Confirm Password" />
                    </div>
                </div>
                <div class="footer">
                    <button onClick={() => handleSubmit(Username, FirstName, LastName, Email, Password, PasswordConfirm)} type="submit" class="btn">Register</button>
                </div>
            </div>
        </div>
    );
}