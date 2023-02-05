/*!
 * Component Comments
 *
 * Componente de Comentários
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";
import Api from 'services/Api.jsx';
import { Col, Row } from "react-bootstrap";
import TextArea from "components/FormInputs/TextArea.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Card from "components/Card/Card.jsx";
import Loader from "assets/img/loading.gif";
import Comment from "components/Comments/Comment.jsx";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Link } from 'react-router-dom';

class Questions extends Component {
  constructor(props) {
    super( props );

		this.state = {
			loading : false,
      data: [],
      info: '',
      error: '',
      confirmMsgTitle: '',
      msgConfirm: '',
      func: '',
      id: 0
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
      Api.post('/wp-json/pbadc/v1/get_comments', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'question_id': localStorage.getItem('questionId')
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

  handleSubmit = (e) => {
    window.event.preventDefault();
    const { data } = this.state;

    this.setState( { loading: true, info: null, error: null }, () => {
      Api.post('/wp-json/pbadc/v1/save_comment', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'question_id': localStorage.getItem('questionId'),
        'id': data.id,
        'comment': data.comment
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg !== undefined ) {
              this.setState( { loading: false, info: null, error: res.data.error_msg } );
            
            } else if ( res.data.info_msg !== undefined ) {
              data.id = 0;
              data.comment = '';
              this.setState( { loading: false, info: res.data.info_msg, error: null, data: data } );
              this.readRecords();
            
            } else {
							this.setState( { loading: false, error: 'Houve um erro ao atualizar o Comentário!' } );
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

  editRecord = (id) => {
    window.event.preventDefault();
    const { data } = this.state;

    this.setState( { loading: true }, () => {
      Api.post('/wp-json/pbadc/v1/get_comment', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'id': id,
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg ) {
              this.setState( { loading: false, info: '', error: res.data.error_msg } );
						} else {
              data.id = res.data.id;
              data.comment = res.data.comment;
              this.setState( { loading: false, info: res.data.info_msg, error: '', func: 'edit', data: data } );
						}
					}

				} )
				.catch( err => this.setState( { loading: false, error: err } ) );
		} )
  }

  onCancel = () => {
    this.setState( { msgConfirm: '', id: 0 } );
  }

  confirmRemoval = (id) => {
    this.setState( { confirmMsgTitle: 'Remover Comentário', msgConfirm: 'Deseja realmente remover o Comentário?', func: this.removeRecord, id: id } );
  }

  removeRecord = () => {
    this.setState( { loading: true, msgConfirm: '' }, () => {
      Api.post('/wp-json/pbadc/v1/remove_comment', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'id': this.state.id
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
    const { loading, data, info, error, confirmMsgTitle, msgConfirm, func } = this.state;
    const records = (data.records) ? data.records : [];

    return (
      <Card
        title="Discussão"
        content={
          <div>
            <Row>
              <Col md={12}>
                {records.map((reg) => {
                  reg.editButton = () => this.editRecord(reg.id);
                  reg.removeButton = () => this.confirmRemoval(reg.id);
                  
                  return (
                    <Comment key={reg.id} reg={reg} />
                  );
                })}
              </Col>
            </Row>

            { loading ? (
              <p><img className="loader" src={Loader} alt="Loader" /></p>
            ) : null }
                  
            { !records.length ? (
              <p>Não há registros encontrados.</p>
            ) : null }

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

            <form onSubmit={this.handleSubmit}>
              <Row>
                <Col md={12}>
                  <TextArea
                    ncols="col-md-12"
                    properties={[
                      {
                        label: "Comentário",
                        name: 'comment',
                        bsClass: "form-control textarea",
                        defaultValue: data.comment,
                        onChange: this.handleOnChange,
                        disabled: false
                      }
                    ]}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Button classes="btn-info margin-left" pullRight fill type="submit">
                    <i className="fa fa-floppy-o" aria-hidden="true"></i>
                    Salvar
                  </Button>

                  <Link to="/admin/questoes" className="btn btn-fill pull-right">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    Voltar
                  </Link>
                </Col>
              </Row>
            </form>
          </div>
        }
      />
    );
  }
}

export default Questions;
