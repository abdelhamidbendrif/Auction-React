import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

function Header() {
  const location = useLocation();

  return (
    <Navbar expand="lg" variant="dark" className="custom-head mb-1">
      <Container>
        <Navbar.Brand href="#">
          Auction Now
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarCollapse" />
        <Navbar.Collapse id="navbarCollapse">

          <Form className="d-flex align-items-center custom-search ">
            <FormControl
              type="search"
              placeholder="Search"
              className="custom-placeholder rounded-pill py-1 bg-dark text-light"
              aria-label="Search"
            />
            <Button variant="outline-success" className="rounded-pill ">
              <AiOutlineSearch />
            </Button>
          </Form>

          <Nav className="custom-links">
            <Nav.Link> <Link to="/Home" className={`custom-routlinks ${location.pathname === '/Home' ? 'active' : ''}`}> Home </Link> </Nav.Link>
            <Nav.Link> <Link to="/MyProducts" className={`custom-routlinks ${location.pathname === '/MyProducts' ? 'active' : ''}`}> MyProducts </Link></Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/category1" className={`custom-droproutlinks ${location.pathname === '/category1' ? 'active' : ''}`}>Category 1</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/category2" className={`custom-droproutlinks ${location.pathname === '/category2' ? 'active' : ''}`}>Category 2</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/all-categories" className={`custom-droproutlinks ${location.pathname === '/all-categories' ? 'active' : ''}`}>All Categories</Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item> <Link to="/Login" className={`custom-droproutlinks ${location.pathname === '/login' ? 'active' : ''}`}> Login </Link> </NavDropdown.Item>
              <NavDropdown.Item> <Link to="/Register" className={`custom-droproutlinks ${location.pathname === '/register' ? 'active' : ''}`}> Sign Up </Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
