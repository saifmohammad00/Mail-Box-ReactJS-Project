import { convertFromRaw } from "draft-js";
import { useCallback, useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listActions } from "./Store/listStore";

const Inbox = () => {
    const dispatch = useDispatch();
    const [selectedMail, setSelectedMail] = useState(null);
    const [showInbox, setShowInbox] = useState(false);
    const [isTrue, setIsTrue] = useState(false);
    const listMails = useSelector(state => state.list.mailItems);
    const isRead = useSelector(state => state.list.isRead);

    const navigate = useNavigate();
    const handleCompose = () => {
        navigate("/ComposeMail");
    }
    const handleIndox = () => {
        setShowInbox(!showInbox);
    }
    const handleSelectMail = async (item) => {
        setSelectedMail(item);
        setIsTrue(!isTrue)
        const newItem = { ...item, isRead: true };
        try {
            const res = await fetch(`https://react-auth-a54ec-default-rtdb.firebaseio.com/Emails/${item.id}.json`, {
                method: "PUT",
                body: JSON.stringify(newItem),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) {
                throw new Error("failed to update mails");
            }
            dispatch(listActions.markAsRead(item));
        } catch (error) {
            console.log(error);
        }
    }
    const fetchData = useCallback (async() => {
        try {
            const res = await fetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/Emails.json');
            if (!res.ok) {
                throw new Error("Retrieve Data failed");
            }
            const data = await res.json();
            let array = [];
            for (const key in data) {
                array.push({ ...data[key], id: key });
            }
            array.reverse();
            if (JSON.stringify(array) !== JSON.stringify(listMails)) {
                dispatch(listActions.addItem(array));
                console.log("hello");
            }
        } catch (error) {
            console.error(error);
        }
    },[dispatch,listMails]);

    useEffect(() => {
        fetchData(); // Fetch initial data
        const intervalId = setInterval(fetchData, 2000); // Poll every 2 seconds

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [fetchData]);
    
    const handleDelete = async (event, item) => {
        event.stopPropagation();
        try {
            const res = await fetch(`https://react-auth-a54ec-default-rtdb.firebaseio.com/Emails/${item.id}.json`, {
                method: "DELETE",
            })
            if (!res.ok) {
                throw new Error("unable to delete")
            }
            dispatch(listActions.deleteItem(item));
        } catch (error) {
            console.log(error);
        }
    }
    return <div>
        <h1>Welcome to Mail box</h1>
        <hr />
        <div className="d-flex position-fixed">
        <Container>
            <Row>
                <Col>
                    <Button variant="primary" type="button" onClick={handleCompose} className="m-3">Compose</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" type="button" onClick={handleIndox} className="m-3">Inbox {isRead ? `unread (${isRead})` : ""}</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="primary" type="button" onClick={handleIndox} className="m-3">Sent</Button>
                </Col>
            </Row>
        </Container>
        {showInbox && <Container className="border border-primary border-3 p-3" style={{ width: "100%" }}>
            <h1>Mails</h1>
            <hr />
            {listMails.map(item => {
                return <div key={item.id}>
                    <Card
                        className="m-auto"
                        onClick={() => handleSelectMail(item)}
                        style={{ cursor: 'pointer', width: "50rem" }}
                    >
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between">
                                {!item.isRead && (
                                    <Badge bg="primary" className="me-2">●</Badge> // Blue dot for unread emails
                                )}
                                <strong>{item.email}</strong>
                            </div>
                            <strong>{item.subject}</strong>
                            <Button type="button" onClick={(event) => handleDelete(event, item)}>Delete</Button>
                        </Card.Body>
                    </Card>
                    {isTrue && selectedMail.id === item.id &&
                        <Card className="mt-2 mb-2 w-50 m-auto">
                            <Card.Header>{item.subject}</Card.Header>
                            <Card.Body>
                                <h5>{item.email}</h5>
                                <p>{convertFromRaw(JSON.parse(item.content)).getPlainText()}</p>
                            </Card.Body>
                        </Card>
                    }
                </div>
            })}
        </Container>}
        </div>
    </div>
}
export default Inbox;