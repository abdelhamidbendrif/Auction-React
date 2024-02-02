import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './style.css';


function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'));
  
  function Logout() {
    localStorage.clear();
    navigate("/Home");
  }

  return (
    <Navbar expand="lg" variant="dark" className="custom-head" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/Home" className='custom-brand font-b'>Auction Now</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarCollapse" />
        <Navbar.Collapse id="navbarCollapse">

          <Form className="d-flex align-items-center custom-search">
            <FormControl
              type="search"
              placeholder="Search"
              className="custom-placeholder rounded-pill py-1 bg-black text-light"
              aria-label="Search"
            />
            <Button variant="outline-success" className="rounded-pill ">
              <AiOutlineSearch />
            </Button>
          </Form>

          <Nav className="custom-links">
            <Nav.Link as={Link} to="/Home" className="custom-routlinks">Home</Nav.Link>

            <NavDropdown title={`Categories`} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/category1" className="custom-droproutlinkss"> Electronics </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category1" className="custom-droproutlinkss"> Cars </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category1" className="custom-droproutlinkss"> Kids </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category2" className="custom-droproutlinks"> Niggas </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/all-categories" className="custom-droproutlinks">All Categories</NavDropdown.Item>
            </NavDropdown>

            {localStorage.getItem("user-info") ?
              <>
                <Nav.Link as={Link} to="/MyProducts" className="custom-routlinks">MyProducts</Nav.Link>
                <NavDropdown title={ user && user.username } id="basic-nav-dropdown" className="mr-5 text-white">
                  <NavDropdown.Item as={Link} to="/Profile" className="custom-droproutlinks">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={Logout} className="custom-droproutlinks">Logout</NavDropdown.Item>
                </NavDropdown>
              </> :
              <>
                 <Nav.Link as={Link} to="/Login" className="custom-routlinks">Login</Nav.Link>
                 <Nav.Link as={Link} to="/Register" className="mr-5 custom-routlinks">Signup</Nav.Link>
              </>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
