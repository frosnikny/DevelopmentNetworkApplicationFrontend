import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cookies from "js-cookie";
import {Button, FormLabel} from "react-bootstrap";
// import {defaultImage} from "../models/models.ts";
import "./NavBar.css"

const NavigationBar = () => {
    const jwtToken = Cookies.get('jwtToken')
    // const userImage = Cookies.get('userImage')
    const login = Cookies.get('login')
    const role = Cookies.get('role')

    const handleLogout = () => {
        const allCookies = Cookies.get();
        Object.keys(allCookies).forEach(cookieName => {
            Cookies.remove(cookieName);
        });
        window.location.reload();
        // dispatch(userSlice.actions.setAuthStatus(false))
    };

    return (
        <Navbar expand="sm" className='bg-black' data-bs-theme="dark">
            <div className='container-xl px-2 px-sm-3'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item className="me-3">
                            <Link to="/devs" className="nav-link ps-0">Виды разработки</Link>
                        </Nav.Item>
                        { (role == "1" || role == "2") && (
                        <Nav.Item className="me-3">
                            <Link to="/requests" className="nav-link">Заказы</Link>
                        </Nav.Item>
                        )}
                        { (role == "2") && (
                        <Nav.Item>
                            <Link to="/moderate-devs" className="nav-link">Управление видами разработки</Link>
                        </Nav.Item>
                        )}
                    </Nav>
                    {jwtToken ? (
                        <>
                            <div className="avatar-container d-flex align-items-center">
                                {/*<Nav.Item>*/}
                                {/*    <img*/}
                                {/*        src={userImage || defaultImage}*/}
                                {/*        alt="User Avatar"*/}
                                {/*        className="avatar me-2"*/}
                                {/*    />*/}
                                {/*</Nav.Item>*/}
                                <Nav.Item className="mx-2 mt-2">
                                    <FormLabel className="text-white">{login || 'Не задано'}</FormLabel>
                                </Nav.Item>
                            </div>
                            <Nav>
                                <Nav.Item className="mx-2">
                                    <Button variant="outline-light" onClick={handleLogout}>
                                        Выйти
                                    </Button>
                                </Nav.Item>
                            </Nav>
                        </>
                    ) : (
                        <>
                            <Nav className="ms-2">
                                <Nav.Item>
                                    <Link to="/login" className="btn btn-outline-light">
                                        Войти
                                    </Link>
                                </Nav.Item>
                            </Nav>
                            <Nav className="ms-2">
                                <Nav.Item>
                                    <Link to="/register" className="btn btn-orange">
                                        Регистрация
                                    </Link>
                                </Nav.Item>
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
