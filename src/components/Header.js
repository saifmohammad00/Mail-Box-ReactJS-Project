import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store/auth";

const Header = () => {
    const isAuthenticated=useSelector(state=>state.auth.isAuthenticated);
    const dispatch=useDispatch();
    const handleLogout=()=>{
        dispatch(authActions.logout());
    }
    return <Navbar bg="dark" variant="dark" className="position-fixed w-100 top-0">
        <Container className="d-flex justify-content-between align-items-center">
            <Navbar.Brand className="flex-grow-1 text-center">
                <span style={{ fontSize: '2rem' }}>
                    Mail Box
                </span>
            </Navbar.Brand>
            {isAuthenticated && <Nav>
                <Button onClick={handleLogout} type="button">Logout</Button>
            </Nav>}
        </Container>
    </Navbar>
}
export default Header;