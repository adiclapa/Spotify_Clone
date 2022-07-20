import "bootstrap/dist/css/bootstrap.min.css"
import { useState, useEffect } from "react"
import Login from "./Login"
import Dashboard from "./Dashboard"
import Register from './Register'

let code = new URLSearchParams(window.location.search).get("code");


function App() {
    const [screen, setScreen] = useState(code ? "dashboard" : "");
  
    const render = () => {
        if (screen) {
            if (screen === "dashboard") {
                sessionStorage.setItem("code", code);
                return <Dashboard code={code}></Dashboard>
            }
            if (screen === "register") {
                return <Register setScreen={setScreen}></Register>
            }
            if (screen === "admin") {
                //TODO
            }
        }
        else{
            return <Login setScreen={setScreen}></Login>
        }
    }
    return (
        // code ? <Dashboard code={code}></Dashboard> : <Login></Login>
        <div className="App">
            {render()}
        </div>
    );
}

export default App
