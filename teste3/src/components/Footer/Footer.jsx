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
import { Grid } from "react-bootstrap";

import hangarLogo from "assets/img/hangar-logo.png";

class Footer extends Component {
  render() {
    return (
      <footer className="footer footer-admin">
        <Grid fluid>
          <div className="copyright pull-right">
            <div className="col-sm-6">
              <span>Copyright © {(new Date().getFullYear())} - <strong>Bravi - Teste 3</strong>.</span>
            </div>
            <div className="col-sm-6">
              <div className="hangar">
                <a className="hangar_link" href="https://hangar.digital" rel="noopener noreferrer" title="Desenvolvido por Hangar Digital" target="_blank">
                  <img className="hangar_link-logo" src={hangarLogo} alt="Hangar Digital" />
                </a>
                <div className="hangar_text"></div>
              </div>
            </div>
          </div>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
