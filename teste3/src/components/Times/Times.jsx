/*!
 * Component Comments
 *
 * Componente de Tempos
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";
import Api from 'services/Api.jsx';
import { Col, Row, Table } from "react-bootstrap";
import DateInput from "components/FormInputs/DateInput.jsx";
import TimeInput from "components/FormInputs/TimeInput.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Loader from "assets/img/loading.gif";
import SweetAlert from 'react-bootstrap-sweetalert';

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
      Api.post('/wp-json/pbadc/v1/get_times', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'question_id': localStorage.getItem('questionId')
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg ) {
              this.setState( { loading: false, error: res.data.error_msg } );
						} else {
              res.data.id = 0;
              res.data.date = this.getToday();
              res.data.time = null;
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
      Api.post('/wp-json/pbadc/v1/save_time', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'id': data.id,
        'date': data.date,
        'question_id': localStorage.getItem('questionId'),
        'time': data.time
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg !== undefined ) {
              this.setState( { loading: false, info: null, error: res.data.error_msg } );
            
            } else if ( res.data.info_msg !== undefined ) {
              this.setState( { loading: false, info: res.data.info_msg, error: null, data: data } );
              this.readRecords();
            
            } else {
							this.setState( { loading: false, error: 'Houve um erro ao atualizar o Tempo!' } );
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
      Api.post('/wp-json/pbadc/v1/get_time', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'id': id
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg ) {
              this.setState( { loading: false, info: '', error: res.data.error_msg } );
						} else {
              data.id = res.data.id;
              data.date = res.data.date;
              data.time = res.data.time;
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
    this.setState( { confirmMsgTitle: 'Remover Tempo', msgConfirm: 'Deseja realmente remover o Tempo?', func: this.removeRecord, id: id } );
  }

  removeRecord = () => {
    this.setState( { loading: true, msgConfirm: '' }, () => {
      Api.post('/wp-json/pbadc/v1/remove_time', {
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

  getToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    } 
    return dd + '/' + mm + '/' + yyyy;
  }

  render() {
    const { loading, data, info, error, confirmMsgTitle, msgConfirm, func } = this.state;
    const records = (data.records) ? data.records : [];
    const date = (data.date) ? data.date : '';
    const time = (data.time) ? data.time : '';
    console.log(data);

    return (
      <div className="details-panel records-panel">
        <Row>
          <Col md={12}><h3 className="title">Tempos Apontados</h3></Col>
        </Row>
        
        { records.length ? (
          <Table striped hover>
            <thead>
              <tr>
                <th>Data</th>
                <th>Tempo Apontado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {records.map((reg) => {
                reg.editButton = () => this.editRecord(reg.id);
                reg.removeButton = () => this.confirmRemoval(reg.id);
                
                return (
                  <tr key={reg.id}>
                    <td>{reg.date}</td>
                    <td>{reg.time}</td>
                    <td>
                      <a href="#!" onClick={() => this.editRecord(reg.id)} title="Editar">
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </a>

                      <a href="#!" onClick={() => this.confirmRemoval(reg.id)} title="Remover">
                        <i className="fa fa-times" aria-hidden="true"></i>
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
            <Col md={7}>
              <div className="form-group">
                <label className="control-label">Data</label>
                <DateInput name="date" type="text" className="form-control" value={date} onChange={this.handleOnChange} />
              </div>
            </Col>

            <Col md={5}>
              <div className="form-group">
                <label className="control-label">Tempo</label>
                <TimeInput name="time" type="text" className="form-control" value={time} onChange={this.handleOnChange} />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Button classes="btn-sm btn-info margin-left" pullRight fill type="submit">
                <i className="fa fa-floppy-o" aria-hidden="true"></i>
                Salvar
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default Questions;
