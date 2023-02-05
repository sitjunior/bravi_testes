/*!
 * VIEW ListQuestions
 *
 * View da Lista de Questoes
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";
import Api from 'services/Api.jsx';
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Loader from "assets/img/loading.gif";
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import Pagination from 'components/Pagination/Pagination.jsx';

class ListQuestions extends Component {
  constructor( props ) {
    super( props );

    var baseUrl = props.match.path;
    var nPage2 = props.location.pathname.replace(baseUrl, '').replace(/\D/g,'');
    var nPage = (nPage2 !== '') ? nPage2 : 1;

		this.state = {
			loading : false,
      data: [],
      info: '',
      error: '',
      confirmMsgTitle: '',
      msgConfirm: '',
      func: '',
      id: 0,
      status: '',
      baseUrl: baseUrl+'/',
      nPage: nPage
    };
  }
  
  createMarkup = ( data ) => ({
		__html: data
	});

  componentDidMount() {
    this.readRecords();
  }

  readRecords = () => {
    this.setState( { loading: true }, () => {
      Api.post('/wp-json/pbadc/v1/get_questions', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'company_id': localStorage.getItem('companyId'),
        'npage': this.state.nPage
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg ) {
              this.setState( { loading: false, error: res.data.error_msg } );
						} else {
							this.setState( { loading: false, data: res.data } );
						}
					}

				} )
				.catch( err => this.setState( { loading: false, error: err } ) );
		} )
  }

  onCancel = () => {
    this.setState( { msgConfirm: '', id: 0 } );
  }

  updateStatusConfirm = (id, status) => {
    this.setState( { confirmMsgTitle: 'Atualizar Status da Questão', msgConfirm: 'Deseja realmente atualizar o Status da Questão?', func: this.updateStatus, id: id, status: status } );
  }

  updateStatus = () => {
    this.setState( { loading: true, msgConfirm: '' }, () => {
      Api.post('/wp-json/pbadc/v1/update_status_question', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'id': this.state.id,
        'status': this.state.status
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg ) {
              this.setState( { loading: false, info: '', error: res.data.error_msg } );
						} else {
              this.setState( { loading: false, info: res.data.info_msg, error: '' } );
              this.readRecords();
						}
					}

				} )
				.catch( err => this.setState( { loading: false, error: err } ) );
		} )
  }

  render() {
    const { loading, data, info, error, confirmMsgTitle, msgConfirm, func, baseUrl, nPage } = this.state;
    const userRole = localStorage.getItem('userRole');
    const addButton = (localStorage.getItem('userRole') === 'customer') ? '/admin/questoes/adicionar' : null;
    const previousPage = (data.previousPage) ? data.previousPage : null;
    const nextPage = (data.nextPage) ? data.nextPage : null;
    const pages = (data.pages) ? data.pages : null;
    const nRecords = (data.nRecords) ? data.nRecords : null;
    const records = (data.records) ? data.records : [];

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              { info && <div className="alert alert-info" dangerouslySetInnerHTML={ this.createMarkup( info ) }/> }
              { error && <div className="alert alert-danger" dangerouslySetInnerHTML={ this.createMarkup( error ) }/> }

              { (msgConfirm !== '') &&
                <SweetAlert
                  warning
                  showCancel
                  cancelBtnText="Não"
                  cancelBtnCssClass="btn-fill btn-default"
                  confirmBtnText="Sim"
                  confirmBtnCssClass="btn-fill btn-default"
                  confirmBtnBsStyle="danger"
                  title={confirmMsgTitle}
                  onConfirm={func}
                  onCancel={this.onCancel}
                  focusCancelBtn
                  >
                  {msgConfirm}
                </SweetAlert>
              }

              <Card
                title="Lista de Questões"
                addButton={addButton}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div className="record-table">
                    <Pagination
                      baseUrl={baseUrl}
                      nPage={nPage}
                      nextPage={nextPage}
                      pages={pages}
                      previousPage={previousPage}
                      nRecords={nRecords}
                    />
                    
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Questão</th>
                          <th>Cliente</th>
                          { userRole === 'attendant' &&
                            <th>Empresa</th>
                          }
                          <th>Status</th>
                          <th>Atualizado em</th>
                          <th className="opcoes">Opções</th>
                        </tr>
                      </thead>
                      <tbody>
                        { loading ? (
                          <tr>
                            <td colSpan="5">
                              <img className="loader" src={Loader} alt="Loader" />
                            </td>
                          </tr>
                        ) : null }
                        
                        { !records.length ? (
                          <tr>
                            <td colSpan="5">Não há registros encontrados.</td>
                          </tr>
                        ) : null }

                        {records.map((prop) => {
                          return (
                            <tr key={prop.id}>
                              <td>{ prop.title }</td>
                              <td>{ prop.customer }</td>
                              { userRole === 'attendant' &&
                                <td>{ prop.company }</td>
                              }
                              <td>{ prop.status }</td>
                              <td>{ prop.date }</td>
                              <td>
                                { prop.status_code !== 'closed' &&
                                  <Link to={"/admin/questoes/editar/"+prop.id} title="Editar">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                  </Link>
                                }

                                { prop.status_code !== 'closed' &&
                                  <a href="#!" onClick={() => this.updateStatusConfirm(prop.id, 'closed')} title="Fechar Questão">
                                    <i className="fa fa-folder" aria-hidden="true"></i>
                                  </a>
                                }

                                { prop.status_code === 'closed' &&
                                  <a href="#!" onClick={() => this.updateStatusConfirm(prop.id, 'reopened')} title="Reabrir Questão">
                                    <i className="fa fa-folder-open" aria-hidden="true"></i>
                                  </a>
                                }
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  
                    <Pagination
                      baseUrl={baseUrl}
                      nPage={nPage}
                      nextPage={nextPage}
                      pages={pages}
                      previousPage={previousPage}
                      nRecords={nRecords}
                    />
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ListQuestions;
