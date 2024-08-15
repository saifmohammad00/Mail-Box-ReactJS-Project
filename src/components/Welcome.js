import { useRef, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Welcome = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const emailRef = useRef(null);
    const subjectRef = useRef(null);
    const [errors, setErrors] = useState({});

    const handleSend = async() => {
        const email = emailRef.current.value;
        const subject = subjectRef.current.value;
        if(email || subject){
           return;
        }
        const contentState = editorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);

        const formData = {
            email,
            subject,
            content: JSON.stringify(rawContent),
        };
        try{
        //   const res=await fetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/Emails',{
        //     method:"POST",
        //     body:JSON.stringify(formData),
        //     Headers:{
        //         'Content-Type':'application/json'
        //     }
        //   })
        //   if(!res.ok){
        //     throw new Error("failed to post email");
        //   }

        }catch(error){
            alert(error.message);
        }
        
        emailRef.current.value = '';
        subjectRef.current.value = '';
        setEditorState(EditorState.createEmpty());
    };

    return <div>
        <h1>Welcome to your mail box!!!</h1>
        <hr />
        <Container>
            
            <Card>
                <Card.Header>Compose Mail</Card.Header>
                <Card.Body>
                    <Form>
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
                                className="h-50"
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
                        <Button variant="primary" onClick={handleSend}>
                            Send
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    </div>
}
export default Welcome;