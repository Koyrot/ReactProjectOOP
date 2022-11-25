import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Bisection from './Root of Equation/Bisection'
import FalsePosition from './Root of Equation/FalsePosition'
import GaussElimination from './Linear Algebra/GaussElimination'
import LinearRegression from './Least Regression/LinearRegression'
import Lagrange from './Interpolation/Lagrange'

function Navbars() {
  return (
<Router>
    <div>
    <Navbar collapseOnSelect expand="lg" bg="success" variant={"dark"}>
      <Container>
        <Navbar.Brand as={Link} to={"/home"}>Numerical Method</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Root of Equation">
              <NavDropdown.Item as={Link} to={"/bisection"}>Bisection</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/falsePosition"}>False Position</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Linear Algebra">
              <NavDropdown.Item as={Link} to={"/gauss"}>Gauss Elimination</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Interpolation">
              <NavDropdown.Item as={Link} to={"/lagrange"}>Lagrange</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Least Regression">
              <NavDropdown.Item as={Link} to={"/linear_regression"}>Linear Regression</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    <div>
       <Routes>
          <Route path="/bisection" element={<Bisection/>}></Route>
          <Route path="/falsePosition" element={<FalsePosition/>}></Route>
          <Route path="/gauss" element={<GaussElimination/>}></Route>
          <Route path="/lagrange" element={<Lagrange/>}></Route>
          <Route path="/linear_regression" element={<LinearRegression/>}></Route>
        </Routes>
    </div>
    </Router>
  );
}

export default Navbars;