import { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const api = "";

const SignUp = () => {
    let token="";
    const enteredEmail = useRef(null);
    const enteredPass = useRef(null);
    const enteredCpass = useRef(null);
    const [islogged, setIsLogged] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url;
        if (islogged) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api}`
        } else {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api}`
            if (enteredCpass.current.value !== enteredPass.current.value) {
                alert("passwords dont match");
                return;
            }
        }
        const email = enteredEmail.current.value;
        const pass = enteredPass.current.value;
        try {
            const res = await fetch(`${url}`, {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: pass,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) {
                throw new Error("authentication failed");
            }
            const data=await res.json();
            if (islogged) {
                token=data.idToken;
                navigate("/Welcome");
                return;
            }
            setIsLogged(true);
            enteredCpass.current.value = "";
            enteredEmail.current.value = "";
            enteredPass.current.value = "";
        } catch (error) {
            alert(error.message);
        }
    }
    const handleToggle = () => {
        setIsLogged(prev => !prev);
    }
    return <Container className="centered-wrapper">
        <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col lg={3} className="text-center">
                <Card border="secondary" className="p-4 mb-2">
                    <Card.Title>{islogged ? "Login" : "Sign Up"}</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" ref={enteredEmail} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" ref={enteredPass} required />
                        </Form.Group>

                        {!islogged && <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Control type="password" placeholder="Confirm Password" ref={enteredCpass} required />
                        </Form.Group>}

                        <Button variant="primary" type="submit" className="w-100 mb-2">
                            {islogged ? "Login" : "Sign Up"}
                        </Button>

                        {islogged && <Link to="/" className="mb-2">Forget Password?</Link>}

                    </Form>
                </Card>
                <Button variant="secondary" type="button" className="w-100" onClick={handleToggle}>
                    {islogged ? "Don't have an account? Sign Up" : "Already Have an Account? Login"}
                </Button>
            </Col>
        </Row>
    </Container>
}
export default SignUp;