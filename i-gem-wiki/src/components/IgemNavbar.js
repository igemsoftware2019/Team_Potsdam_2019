import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink as BootStrapNavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {
  NavLink
} from 'react-router-dom'

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
      <div>
        <Navbar fixed="top" color="dark" dark expand="md">
          <NavbarBrand>
            <NavLink exact to="/">Thermal UP</NavLink>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Team
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <NavLink to="/Team/">Team Members</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to="/Collaborations/">Collaborations</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <BootStrapNavLink>
                  <NavLink to="/Safety/">Safety</NavLink>
                </BootStrapNavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
