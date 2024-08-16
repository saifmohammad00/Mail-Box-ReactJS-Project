import { Fragment } from "react";
import SignUp from "./components/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ComposeMail from "./components/ComposeMail";
import Inbox from "./components/Inbox";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/inbox" element={<Inbox/>}/>
        <Route path="/ComposeMail" element={<ComposeMail />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
