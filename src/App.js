import { Fragment } from "react";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
