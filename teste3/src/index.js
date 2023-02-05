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
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/styles.scss?v=1.0.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import LoginLayout from "layouts/Login.jsx";
import ForgotMyPassword from "layouts/ForgotMyPassword.jsx";
import AdminLayout from "layouts/Admin.jsx";

ReactDOM.render(
  <BrowserRouter basename="/clientes">
    <Switch>
      <Route path="/" exact render={props => <LoginLayout {...props} />} />
      <Route path="/login" render={props => <LoginLayout {...props} />} />
      <Route path="/esqueci-minha-senha" render={props => <ForgotMyPassword {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
