/*!
 * Component Attachments
 *
 * Componente de Anexos
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";
import Api from 'services/Api.jsx';
import { Col, Row, Table } from "react-bootstrap";
import Button from "components/CustomButton/CustomButton.jsx";
import Loader from "assets/img/loading.gif";
import SweetAlert from 'react-bootstrap-sweetalert';

class Attachments extends Component {
  constructor(props) {
    super( props );

    this.fileUpload = React.createRef();

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
  
  getBase64(file, onLoadCallback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = onLoadCallback;
    reader.onerror = function(error) {
      console.log('Error when converting PDF file to base64: ', error);
    };
  }

  componentDidMount() {
    this.readRecords();
  }

  readRecords = () => {
    this.setState( { loading: true }, () => {
      Api.post('/wp-json/pbadc/v1/get_attachments', {
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

  handleOnChange = (e) => {
    e.preventDefault();

    this.setState( { loading: true, info: null, error: null } );

    var arquivo = e.target.files[0];
    this.getBase64(arquivo, (e) => {   
      Api.post('/wp-json/pbadc/v1/save_attachment', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'question_id': localStorage.getItem('questionId'),
        'file': e.target.result,
        'name': arquivo.name,
        'type': arquivo.type
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg !== undefined ) {
              this.setState( { loading: false, info: null, error: res.data.error_msg } );
            
            } else if ( res.data.info_msg !== undefined ) {
              this.setState( { loading: false, info: res.data.info_msg, error: null } );
              this.readRecords();
            
            } else {
							this.setState( { loading: false, error: 'Houve um erro ao atualizar o Anexo!' } );
						}
					}

				} )
				.catch( err => this.setState( { loading: false, error: err } ) );
		});
  }

  handleOnClick = (e) => {
    this.fileUpload.current.click();
  }

  onCancel = () => {
    this.setState( { msgConfirm: '', id: 0 } );
  }

  confirmRemoval = (id) => {
    this.setState( { confirmMsgTitle: 'Remover Anexo', msgConfirm: 'Deseja realmente remover o Anexo?', func: this.removeRecord, id: id } );
  }

  removeRecord = () => {
    this.setState( { loading: true, msgConfirm: '' }, () => {
      Api.post('/wp-json/pbadc/v1/remove_attachment', {
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
      <div className="details-panel records-panel">
        <Row>
          <Col md={12}><h3 className="title">Anexos</h3></Col>
        </Row>
        
        { records.length ? (
          <Table striped hover>
            <thead>
              <tr>
                <th>Anexo</th>
                <th>Usuário</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {records.map((reg) => {
                reg.editButton = () => this.editRecord(reg.id);
                reg.removeButton = () => this.confirmRemoval(reg.id);
                
                return (
                  <tr key={reg.id}>
                    <td>{reg.title}</td>
                    <td>{reg.user}</td>
                    <td>{reg.date}</td>
                    <td>
                      { reg.user_id === localStorage.getItem('userId') &&
                        <a href="#!" onClick={() => this.confirmRemoval(reg.id)} title="Remover">
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </a>
                      }

                      <a href={reg.file} target="_blank" rel="noopener noreferrer" title="Abrir Anexo">
                        <i className="fa fa-paperclip" aria-hidden="true"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : null }

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
              <input type="file" name="file" className="display-none" ref={this.fileUpload} onChange={this.handleOnChange} />
              <Button classes="btn-sm btn-info margin-left" pullRight fill onClick={this.handleOnClick}>
                <i className="fa fa-floppy-o" aria-hidden="true"></i>
                Anexar Arquivo
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default Attachments;
