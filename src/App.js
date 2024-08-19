import { Fragment } from "react";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ComposeMail from "./components/ComposeMail";
import Inbox from "./components/Inbox";
import Header from "./components/Header";
import { useSelector } from "react-redux";
function App() {
  const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
  return (
    <Fragment>
      <Header/>
      <Router>
        <Routes>
        <Route path="/" element={<SignUp />} />
        {isAuthenticated &&  <Route path="/inbox" element={<Inbox/>}/>}
        {isAuthenticated && <Route path="/ComposeMail" element={<ComposeMail />} />}
        <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
