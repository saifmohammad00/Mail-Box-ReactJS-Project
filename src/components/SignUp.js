import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
const api="AIzaSyA0x9iK68jy0hyR54eowao2y47FFKF1x18"
const SignUp = () => {
    const enteredEmail=useRef();
    const enteredPass=useRef();
    const enteredCpass=useRef();
    const [islogged, setIsLogged] = useState(false);
    
    const handleSubmit=async(e)=>{
          e.preventDefault();
          if(enteredCpass.current.value!==enteredPass.current.value){
            alert("passwords dont match")
            return;
          }
          const email=enteredEmail.current.value;
          const pass=enteredPass.current.value;
          try{
            const res=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api}`,{
                method:"POST",
                body:JSON.stringify({
                    email:email,
                    password:pass,
                    returnSecureToken:true
                })
              })
              if(!res.ok){
                throw new Error("unable to SignUp");
              }
              console.log("successfully SignUp");
          }catch(error){
            console.log(error.message);
          }
    }
    return <div className="centered-wrapper">
        <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col  lg={2} className="text-center">
            <h1>SignUp</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" required ref={enteredEmail}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" required ref={enteredPass}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Control type="password" placeholder="Confirm Password" required ref={enteredCpass}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mb-2">
                        {!islogged ? "Sign Up" : "Login"}
                    </Button>
                    
                    <Button variant="primary" type="button" className="w-100">
                        Already Have an Account? Login
                    </Button>
                </Form>
            </Col>
        </Row>
    </div>
}
export default SignUp;