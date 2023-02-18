import logo from "./logo.svg";
import './App.css';
import LoginRegister from "./components/Authentication/LoginRegister";
import SubGREDDIIT from "./components/SubGREDDIIT/SubGREDDIIT";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GredsPage from "./components/GredsPage/GredsPage";
import { useState } from "react";
function App() {
    const [userDetails, setUserDetails] = useState(false);
    const [myGredDetails, setMyGredDetails] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginRegister userDetails={userDetails} setUserDetails={setUserDetails} />}></Route>
                <Route path="/profile" element={<Dashboard userDetails={userDetails} setUserDetails={setUserDetails} />}></Route>
                <Route path="/mygreds" element={<GredsPage userDetails={userDetails} setUserDetails={setUserDetails} myGredDetails={myGredDetails} setMyGredDetails={setMyGredDetails} />}></Route>
                <Route path="/mygreds/gred" element={<SubGREDDIIT />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
