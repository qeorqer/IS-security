import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

const AppHeader = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#lab1">Caesar cipher</Nav.Link>
            <Nav.Link href="#lab2">Trithemius cipher</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default AppHeader