import { convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listActions } from "./Store/listStore";
import useFetch from "./useFetch";

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
    const { data: emailsData, error: fetchError, refetch: refetchEmails } = useFetch('https://react-auth-a54ec-default-rtdb.firebaseio.com/Emails.json');

    useEffect(() => {
        if (emailsData) {
            let array = [];
            for (const key in emailsData) {
                array.push({ ...emailsData[key], id: key });
            }
            array.reverse();
            if (JSON.stringify(array) !== JSON.stringify(listMails)) {
                dispatch(listActions.addItem(array));
            }
        }
        if (fetchError) {
            console.log(fetchError)
        }
    }, [emailsData, dispatch, fetchError, listMails]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetchEmails(); // Poll every 2 seconds
        }, 2000);

        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [refetchEmails]);

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
    return <div style={{ marginTop: "5rem" }}>
        <h1>Welcome to Mail box</h1>
        <hr />
        <div className="d-flex position-fixed">
            <Container>
                <Row>
                    <Col>
                        <Button variant="primary" type="button" onClick={handleCompose} className="m-3" style={{ borderRadius: "25px" }}> + Compose</Button>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <Button variant="primary" type="button" onClick={handleIndox} className="m-3">Inbox {isRead ? `unread (${isRead})` : ""}</Button>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <Button variant="primary" type="button" onClick={handleIndox} className="m-3">Sent</Button>
                    </Col>
                </Row>
            </Container>
            {showInbox && <Container className="border border-primary border-3 p-3" style={{ width: "100%", marginLeft: "15rem" }}>
                <h1 className="text-center">Mails</h1>
                <hr />
                <div className=" d-flex justify-content-between align-items-center" style={{ backgroundColor: "lightblue" }}>
                    <h4 className="ps-5 text-center">Subject</h4>
                    <h4 className="ps-5">Sender</h4>
                    <h4 className="text-center pe-3">Delete</h4>
                </div>
                {listMails.map(item => {
                    return <div key={item.id}>
                        <Card
                            // className="m-auto"
                            onClick={() => handleSelectMail(item)}
                            style={{ cursor: 'pointer', width: "50rem" }}
                        >
                            <Card.Body className="d-flex">
                                <Col xs="auto">
                                    {!item.isRead ? (
                                        <Badge bg="primary" className="me-2">●</Badge> // Blue dot for unread emails
                                    )
                                        : (
                                            <Badge bg="secondary" className="me-2">●</Badge>
                                        )}
                                </Col>
                                <Col xs className="pe-3">
                                    <strong>{item.subject}</strong>
                                </Col>
                                <Col xs className="pe-3">
                                    <strong>{item.email}</strong>
                                </Col>
                                <Col xs="auto">
                                    <Button variant="danger" type="button" onClick={(event) => handleDelete(event, item)}>Delete</Button>
                                </Col>
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