/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { NavItem, Nav } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class AdminNavbarLinks extends Component {
  state = {
    navigate: false
  }
  
  logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('gravatar');
    localStorage.removeItem('apiKey');

    this.setState({ navigate: true });
  }
  
  render() {
    const { navigate } = this.state;

    if ( localStorage.getItem('userId') === null ) {
      this.setState({ navigate: true });
    }

    if (navigate) {
      return <Redirect to="/" push={true} />;
    }

    const gravatar = 'https://www.gravatar.com/avatar/'+localStorage.getItem('gravatar')+'?s=30';

    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={1} href="/admin/meu-usuario" title="Meu Usuário">
            <img src={gravatar} alt={localStorage.getItem('userName')} className="avatar" />
            {localStorage.getItem('userName')}
          </NavItem>
          <NavItem eventKey={2} href="#" onClick={e=>this.logout(e)}>
            <i className="fa fa-sign-out" />
            Sair
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
