import { convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Welcome=()=>{
    const [isTrue,setIsTrue]=useState(false);
    const [list,setList]=useState([]);
    const navigate=useNavigate();
    const handleCompose=()=>{
        navigate("/ComposeMail");
    }
    const handleIndox=()=>{
          setIsTrue(!isTrue);
    }
    useEffect(()=>{
        async function getData() {
            try{
                const res=await fetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/Emails.json');
                if(!res.ok){
                    throw new Error("Retrive Data failed");
                }
                const data=await res.json();
                let array=[];
                console.log(data);
                for(const key in data){
                    array.push({...data[key],id:key});
                }
                setList(array);
    
            }catch(error){
                alert(error);
            }
        }
        getData();
    },[]);
    return <div>
        <h1>Welcome to Mail box</h1>
        <hr/>
        <Button variant="primary" type="button" onClick={handleCompose} className="m-3">Compose</Button>
        <Button variant="primary" type="button" onClick={handleIndox}>Indox</Button>
        {isTrue && <Container className="mt-3">
              {list.map(item=>{
                return <Card key={item.id} className="p-3">
                    <Card.Title>{item.email}</Card.Title>
                    <Card.Body>
                        <h5>{item.subject}</h5>
                        <p>{convertFromRaw(JSON.parse(item.content)).getPlainText()}</p>
                    </Card.Body>
                </Card>
              })}
            </Container>}
    </div>
}
export default Welcome;