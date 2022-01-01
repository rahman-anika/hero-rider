import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { HashLink } from 'react-router-hash-link';

const Header = () => {

    const { user, logout } = useAuth();

    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top" collapseOnSelect expand="lg" >

                <Container>

                    {/* website name and icon starts */}
                    <Navbar.Brand href="#home">
                        <span style={{ color: 'orange', fontWeight: 'bold' }}> <i class="fas fa-car-side"></i>  Hero Rider</span>
                    </Navbar.Brand>
                    {/* website name and icon ends */}


                    {/* routing hashlink starts */}
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">

                        {/* homepage section starts */}
                        <Nav.Link as={HashLink} to="/home#home"> <span style={{ color: 'orange', fontWeight: 'bold' }}> Home </span> </Nav.Link>
                        {/* homepage section ends */}

                        {/* services section starts */}
                        <Nav.Link as={HashLink} to="/home#services"><span style={{ color: 'orange', fontWeight: 'bold' }}> Services </span></Nav.Link>
                        {/* services section ends */}








                        {/* about section starts */}
                        <Nav.Link as={HashLink} to="/home#about"><span style={{ color: 'orange', fontWeight: 'bold' }}> About Us </span></Nav.Link>
                        {/* about section ends */}




                        {/* 
                    if logged in then Dashboard shows */}

                        {user?.email &&

                            < Nav.Link as={Link} className="item m-2 p-2" to="/dashboard"><span style={{ color: 'orange', fontWeight: 'bold' }}> Dashboard </span></Nav.Link>

                        }


                        {/* if user logged in then shows logout button otherwise shows login button*/}

                        {user?.email ?
                            <Button onClick={logout} variant="light">Logout</Button>

                            :
                            <Nav.Link as={Link} to="/login"><span style={{ color: 'orange', fontWeight: 'bold' }}> Login </span></Nav.Link>}

                        {/* showing logged in user's display name  */}
                        <Navbar.Text>
                            <span style={{ color: 'orange', fontWeight: 'bold' }}>
                                Signed in as:
                                <a href="#login">
                                    {user?.displayName}</a>

                            </span>
                        </Navbar.Text>


                    </Navbar.Collapse>
                    {/* routing hashlink ends */}

                </Container>
            </Navbar>
        </>
    );
};

export default Header;