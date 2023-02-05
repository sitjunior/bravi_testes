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

export class UserCard extends Component {
  render() {
    return (
      <div className="card card-user">
        <div className="image">
          <img src={this.props.bgImage} alt="..." />
        </div>
        <div className="content">
          <div className="author">
            <img
              className="avatar border-gray"
              src={this.props.avatar}
              alt="..."
            />
            <h4 className="title">
              {this.props.name}
            </h4>
          </div>
          <p className="description text-center">Você pode alterar seu avatar no <a href="https://br.gravatar.com/" target="_blank" rel="noopener noreferrer"><strong>Gravatar</strong></a>.<br/>
          <strong>Gravatar</strong> é um serviço online onde usuários podem registrar uma conta baseada em seu endereço de email e enviar uma imagem para ser usada como avatar. Assim, o avatar fica associado a sua conta podendo ser utilizado em vários sites e sistemas.</p>
        </div>
      </div>
    );
  }
}

export default UserCard;
