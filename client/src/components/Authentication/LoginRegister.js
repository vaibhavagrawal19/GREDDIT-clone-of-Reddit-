import Login from "./Login";
import Register from "./Register";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function LoginRegister({ userDetails, setUserDetails, setMyGredDetails, setCurrGredDetails }) {
    const [newUser, setNewUser] = useState(false);
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        setUserDetails(false);
    }
    if (userDetails) {
        return <Navigate to="/profile" />;
    }

    setMyGredDetails(false);
    setCurrGredDetails(false);

    // checking if the user is already logged in
    fetch("http://localhost:4000/auth/refresh", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "refreshToken": localStorage.getItem("refreshToken"),
        },
    })
        .then(
            (res) => {
                if (res.ok) {
                    // the refresh token was present already, direct user to his profile page
                    let body = res.json();
                    body.then((body) => {
                        setUserDetails(body);
                    });
                }
            });


    return (<div>
        {newUser ? <Register setNewUser={setNewUser} /> : <Login setNewUser={setNewUser} setUserDetails={setUserDetails} />}
    </div>);
};