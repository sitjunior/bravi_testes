/*!
 * Component Pagination
 *
 * Componente de Paginação
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";

export class Pagination extends Component {
  render() {
    if (this.props.nRecords > 0) {
      return (
        <div className="row pagination-container">
          <div className="col-sm-6">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                { (this.props.previousPage) && (
                  <li>
                    <a href={this.props.baseUrl+this.props.previousPage} aria-label="Anterior">
                      <span aria-hidden="true">&lsaquo;</span>
                    </a>
                  </li>
                )}

                {this.props.pages.map((page) => {
                  var active = '';
                  var html = <a href={this.props.baseUrl+page}>{page}</a>
                  if (page === this.props.nPage) {
                    active = 'active';
                    html = <span className="page-link">{page}</span>
                  }
                  
                  return (
                    <li className={active} key={page}>
                      {html}
                    </li>
                  )
                })}

                { (this.props.nextPage) && (
                  <li>
                    <a href={this.props.baseUrl+this.props.nextPage} aria-label="Próximo">
                      <span aria-hidden="true">&rsaquo;</span>
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
          
          <div className="col-sm-6">
            <p className="nrecords">Total de <strong>{this.props.nRecords}</strong> registros encontrados</p>
          </div>
        </div>
      );
    } else {
      return '';
    }
  }
}

export default Pagination;
