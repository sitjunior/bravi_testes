/*!
 * VIEW Sidebar
 *
 * View do Sidebar
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";

import logo from "assets/img/peb-logo.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  companiesLink() {
    if (localStorage.getItem('userRole') === 'attendant') {
      const users_url = process.env.REACT_APP_API_URL + '/wp-admin/admin-ajax.php?action=acessar_painel&userid=' + localStorage.getItem('userId') + '&redirect=companies'
      
      return (
        <li>
          <a aria-current="page" className="nav-link" href={users_url} target="_blank" rel="noopener noreferrer">
            <i className="pe-7s-home"></i>
            <p>Empresas</p>
          </a>
        </li>
      );
    }
  }

  usersLink() {
    if (localStorage.getItem('userRole') === 'attendant') {
      const users_url = process.env.REACT_APP_API_URL + '/wp-admin/admin-ajax.php?action=acessar_painel&userid=' + localStorage.getItem('userId') + '&redirect=customers'
      
      return (
        <li>
          <a aria-current="page" className="nav-link" href={users_url} target="_blank" rel="noopener noreferrer">
            <i className="pe-7s-users"></i>
            <p>Usuários</p>
          </a>
        </li>
      );
    }
  }

  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + this.props.image + ")"
    };
    const items = [
      {
        name: "Dashboard",
        to: "/admin/dashboard",
        icon: "pe-7s-graph"
      },
      {
        name: "Questões",
        to: "/admin/questoes",
        icon: "pe-7s-speaker",
      },
      {
        name: "Meu Usuário",
        to: "/admin/meu-usuario",
        icon: "pe-7s-user"
      },
    ];

    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
          {this.props.hasImage ? (
            <div className="sidebar-background" style={sidebarBackground} />
          ) : (
            null
          )}
        <div className="logo">
          <a
            href="/admin/planilhas"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a
            href="/admin/planilhas"
            className="simple-text logo-normal"
          >
            Área do Cliente
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
            {items.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li key={key}>
                    <NavLink
                      to={prop.to}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}

            {this.companiesLink()}
            {this.usersLink()}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
