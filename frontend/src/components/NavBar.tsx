import { A } from "@solidjs/router";
import type { Component } from "solid-js";
import { Navbar, Container, Nav } from "solid-bootstrap";

export const Topbar: Component = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav class="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="#pricing">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}