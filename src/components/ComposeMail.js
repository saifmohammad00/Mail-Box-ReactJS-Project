import { useRef, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";

const ComposeMail = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const emailRef = useRef(null);
    const subjectRef = useRef(null);
    const [success,setSuccess]=useState();
    const navigate=useNavigate();

    const handleSend = async(e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const subject = subjectRef.current.value;
        const isRead=false;

        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);

        const formData = {
            email,
            subject,
            isRead,
            content: JSON.stringify(rawContent),
        };
        try{
          const res=await fetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/Emails.json',{
            method:"POST",
            body:JSON.stringify(formData),
            headers:{
                'Content-Type':'application/json'
            }
          })
          if(!res.ok){
            throw new Error("failed to post email");
          }

          emailRef.current.value = '';
          subjectRef.current.value = '';
          setEditorState(EditorState.createEmpty());
          setSuccess("Email sent successfully");
        }catch(error){
            alert(error.message);
        }
    };
    const handleBack=()=>{
        navigate("/inbox");
    }

    return <Container style={{marginTop:"5rem"}}>
          <Container className="d-flex justify-content-between m-3">
          <h1>Welcome to your mail box!!!</h1>
          <Button type="button" onClick={handleBack}> Back </Button>
          </Container>
        <hr />
        <Container>
            
            <Card>
                <Card.Header>Compose Mail</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSend}>
                        <Form.Group className="mb-3">
                            <Form.Label>To</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Recipient's email"
                                ref={emailRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Subject"
                                ref={subjectRef}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div className="border rounded p-3">
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],
                                    }}
                                    editorStyle={{
                                        minHeight: '200px',
                                        padding: '10px'
                                    }}
                                />
                            </div>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Send
                        </Button>
                    </Form>
                    {success && <Alert variant="success" className="mt-3">{success}</Alert>}
                </Card.Body>
            </Card>
        </Container>
    </Container>
}
export default ComposeMail;