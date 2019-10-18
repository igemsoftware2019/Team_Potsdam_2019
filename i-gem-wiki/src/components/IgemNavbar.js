import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {
  NavLink
} from 'react-router-dom'

import './navbar.css';

//<DropdownItem divider />
export default class IgemNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar fixed="top" dark expand="xl">
        <NavLink className="navbar-brand" exact to="/">
          Thermal
          <img className="navbar-logo" src="https://2019.igem.org/wiki/images/0/06/T--Potsdam--logo_white.png" alt=" UP"></img>
        </NavLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/"> Home </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Team
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Team">Team Members</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Collaborations">Collaborations</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Project
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Description"> Description </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Design"> Design </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Experiments"> Experiments </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Notebook"> Notebook </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Contribution"> Contribution </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Results"> Results </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Demonstrate"> Demonstrate </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Improve"> Improve </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Attributions"> Attributions </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink className="nav-link" to="/Safety">Safety</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/Human_Practices">Human Practices</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Award
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink className="nav-link" to="/Model"> Model </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <a className="nav-link" href="https://igem.org/2019_Judging_Form?team=Potsdam">Judging Form</a>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
