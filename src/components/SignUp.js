import { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const api = "AIzaSyDAslJMvrH6dTGE7qxgk1v3XjrNsp5mXlM";

const SignUp = () => {
    const enteredEmail = useRef();
    const enteredPass = useRef();
    const enteredCpass = useRef();
    const [islogged, setIsLogged] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url;
        if(islogged){
            url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api}`
        }else{
            url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api}`
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
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if (!res.ok) {
                throw new Error("authentication failed");
            }
            if(!islogged){
               setIsLogged(true);
            }
        } catch (error) {
            console.log(error.message);
        }
        enteredCpass.current.value="";
        enteredEmail.current.value="";
        enteredPass.current.value="";
    }
    const handleToggle=()=>{
        setIsLogged(prev=>!prev);
    }
    return <Container className="centered-wrapper">
        <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col lg={3} className="text-center">
            <Card border="secondary" className="p-4">
                <Card.Title>{islogged ? "Login" : "Sign Up"}</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" required ref={enteredEmail} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" required ref={enteredPass} />
                    </Form.Group>

                    {!islogged && <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Control type="password" placeholder="Confirm Password" required ref={enteredCpass} />
                    </Form.Group>}

                    <Button variant="primary" type="submit" className="w-100 mb-2">
                        {islogged ? "Login" : "Sign Up"}
                    </Button>

                    <Button variant="secondary" type="button" className="w-100" onClick={handleToggle}>
                        {islogged ? "New User? SignUp" : "Already Have an Account? Login"}
                    </Button>
                </Form>
                </Card>
            </Col>
        </Row>
    </Container>
}
export default SignUp;