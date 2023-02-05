/*!
 * VIEW QuestionForm
 *
 * View da Formulário da Questão
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";
import Api from 'services/Api.jsx';
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import TextArea from "components/FormInputs/TextArea.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Comments from "components/Comments/Comments.jsx";
import Times from "components/Times/Times.jsx";
import Attachments from "components/Attachments/Attachments.jsx";
import Loader from "assets/img/loading.gif";
import { Link, Redirect } from 'react-router-dom';

class QuestionForm extends Component {
  constructor( props ) {
    super( props );

    var form_title = 'Adicionar Questão';
    var func = 'add';
    if ( props.location.pathname.match(/editar/) ) {
      form_title = 'Editar Questão';
      func = 'edit';
    }

    var id = props.location.pathname.replace(props.match.path+'/', '');
    localStorage.setItem('questionId', id);

		this.state = {
      loading : false,
      form_title: form_title,
      func: func,
      data: [],
      info: '',
      error: '',
      redirect: null,
      id: id
    };
  }
  
  createMarkup = ( data ) => ({
		__html: data
	});

  componentDidMount() {
    if (this.state.func === 'edit') {
      this.setState( { loading: true }, () => {
        Api.post('/wp-json/pbadc/v1/get_question', {
          'user_id': localStorage.getItem('userId'),
          'api_key': localStorage.getItem('apiKey'),
          'company_id': localStorage.getItem('companyId'),
          'id': this.state.id
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
  } 

  handleSubmit = (e) => {
    e.preventDefault();

    const { data } = this.state;

    this.setState( { loading: true, info: null, error: null }, () => {
      Api.post('/wp-json/pbadc/v1/save_question', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'id': data.id,
        'title': data.title,
        'description': data.description
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg !== undefined ) {
              this.setState( { loading: false, info: null, error: res.data.error_msg } );
            
            } else if ( res.data.info_msg !== undefined ) {
              if ( this.state.func === 'add' ) {
                this.setState( { loading: false, info: res.data.info_msg, error: null, redirect: res.data.id } );
              
              } else {
                this.setState( { loading: false, info: res.data.info_msg, error: null } );
              }
            
            } else {
							this.setState( { loading: false, error: 'Houve um erro ao atualizar a Questão!' } );
						}
					}

				} )
				.catch( err => this.setState( { loading: false, error: err } ) );
		} );
  }

  handleOnChange = (e) => {
    var state = this.state;
    state.data[e.target.name] = e.target.value;
    this.setState( { data: state.data } );
  }

  render() {
    const { loading, form_title, func, data, info, error, redirect } = this.state;
    const userRole = localStorage.getItem('userRole');
    const disabled = (userRole === 'attendant') ? true : false;

    if (func === 'add' && redirect !== null) {
      return <Redirect to={'/admin/questoes/editar/'+redirect} />;
    }

    return (
      <div className="content">
        <Grid fluid>
          { loading && <img className="loader" src={Loader} alt="Loader" /> }
          { info && <div className="alert alert-info" dangerouslySetInnerHTML={ this.createMarkup( info ) }/> }
          { error && <div className="alert alert-danger" dangerouslySetInnerHTML={ this.createMarkup( error ) }/> }
          
          <Row>
            <Col md={12}>
              <Card
                title={form_title}
                content={
                  <div>
                    <Row>
                      <Col sm={8}>
                        <form onSubmit={this.handleSubmit}>
                          <FormInputs
                            ncols={["col-md-12"]}
                            properties={[
                              {
                                label: "Título",
                                type: "text",
                                name: 'title',
                                bsClass: "form-control",
                                defaultValue: data.title,
                                onChange: this.handleOnChange,
                                disabled: disabled
                              }
                            ]}
                          />

                          <TextArea
                            ncols="col-md-12"
                            properties={[
                              {
                                label: "Descrição",
                                name: 'description',
                                bsClass: "form-control textarea",
                                defaultValue: data.description,
                                onChange: this.handleOnChange,
                                disabled: disabled
                              }
                            ]}
                          />
                          
                          <Row>
                            <Col md={12}>
                              { userRole === 'customer' &&
                                <Button classes="btn-info margin-left" pullRight fill type="submit">
                                  <i className="fa fa-floppy-o" aria-hidden="true"></i>
                                  Salvar
                                </Button>
                              }

                              <Link to="/admin/questoes" className="btn-fill pull-right btn">
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                                Voltar
                              </Link>
                            </Col>
                          </Row>
                        </form>
                      </Col>

                      { func === 'edit' && (
                        <Col sm={4}>
                          <div className="details-panel">
                            <p>Cliente: <strong>{data.customer}</strong></p>

                            <p>Empresa: <strong>{data.company}</strong></p>

                            <p>Status: <strong>{data.status}</strong></p>

                            <p>Atualizado em: <strong>{data.date}</strong></p>
                          </div>

                          { (userRole === 'attendant') && (
                            <Times />
                          )}

                          <Attachments />
                        </Col>
                      )}
                    </Row>

                    <div className="clearfix" />
                  </div>
                }
              />
            </Col>
          </Row>

          { func === 'edit' && (
            <Comments />
          )}
        </Grid>
      </div>
    );
  }
}

export default QuestionForm;
