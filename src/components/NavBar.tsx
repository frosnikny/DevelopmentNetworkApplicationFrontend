import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
    return (
        <Navbar expand="sm" className='bg-black' data-bs-theme="dark">
            <div className='container-xl px-2 px-sm-3'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Link to="/courses" className="nav-link ps-0">Услуги по разработке</Link>
                        </Nav.Item>
                        {/*<Nav.Item>*/}
                        {/*    <Link to="/" className="nav-link">Soon</Link>*/}
                        {/*</Nav.Item>*/}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
