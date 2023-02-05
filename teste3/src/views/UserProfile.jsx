/*!
 * VIEW UserProfile
 *
 * View de Meu Usuário
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";
import Api from 'services/Api.jsx';
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Loader from "assets/img/loading.gif";
import AvatarBackground from "assets/img/user_profile.jpg";

class UserProfile extends Component {
  constructor( props ) {
		super( props );

		this.state = {
			loading : false,
      data: [],
      info: '',
			error: ''
    };
  }

  createMarkup = ( data ) => ({
		__html: data
	});

  componentDidMount() {
		this.setState( { loading: true }, () => {
      Api.post('/wp-json/pbadc/v1/get_user', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey')
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg !== undefined ) {
              this.setState( { loading: false, error: res.data.error_msg } );
						} else if ( res.data.user_id ) {
							this.setState( { loading: false, data: res.data } );
						} else {
							this.setState( { loading: false, error: 'Nenhum Usuário Encontrado.' } );
						}
					}

				} )
				.catch( err => this.setState( { loading: false, error: err } ) );
		} )
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { data } = this.state;

    this.setState( { loading: true, info: null, error: null }, () => {
      Api.post('/wp-json/pbadc/v1/update_user', {
        'user_id': localStorage.getItem('userId'),
        'api_key': localStorage.getItem('apiKey'),
        'user_firstname': data.user_firstname,
        'user_lastname': data.user_lastname,
        'user_email': data.user_email,
        'user_password': data.user_password,
        'repeat_password': data.repeat_password,
      }).then( res => {
					if ( 200 === res.status ) {
            if ( res.data.error_msg !== undefined ) {
              this.setState( { loading: false, info: null, error: res.data.error_msg } );
						} else if ( res.data.info_msg !== undefined ) {
              var state = this.state;
              state.data['user_password'] = '';
              state.data['repeat_password'] = '';
							this.setState( {
                loading: false,
                info: res.data.info_msg,
                error: null,
                data: state.data
              } );
						} else {
							this.setState( { loading: false, error: 'Houve um erro ao atualizar o Usuário!' } );
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
    const { loading, data, info, error } = this.state;

    const avatar = 'https://www.gravatar.com/avatar/'+localStorage.getItem('gravatar')+'?s=124';

    return (
      <div className="content">
        { loading && <img className="loader" src={Loader} alt="Loader" /> }
        
        { info && <div className="alert alert-info" dangerouslySetInnerHTML={ this.createMarkup( info ) }/> }
        { error && <div className="alert alert-danger" dangerouslySetInnerHTML={ this.createMarkup( error ) }/> }

        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Meu Usuário"
                content={
                  <form onSubmit={this.handleSubmit}>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Nome",
                          type: "text",
                          name: 'user_firstname',
                          bsClass: "form-control",
                          defaultValue: data.user_firstname,
                          onChange: this.handleOnChange
                        },
                        {
                          label: "Sobrenome",
                          type: "text",
                          name: 'user_lastname',
                          bsClass: "form-control",
                          defaultValue: data.user_lastname,
                          onChange: this.handleOnChange
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "E-mail",
                          type: "email",
                          name: 'user_email',
                          bsClass: "form-control",
                          defaultValue: data.user_email,
                          onChange: this.handleOnChange
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Senha",
                          type: "password",
                          name: 'user_password',
                          bsClass: "form-control",
                          autoComplete: "off",
                          defaultValue: data.user_password,
                          onChange: this.handleOnChange
                        },
                        {
                          label: "Repetir Senha",
                          type: "password",
                          name: 'repeat_password',
                          bsClass: "form-control",
                          autoComplete: "off",
                          defaultValue: data.repeat_password,
                          onChange: this.handleOnChange
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      <i className="fa fa-pencil"></i>
                      Atualizar
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage={AvatarBackground}
                avatar={avatar}
                name="Seu Avatar"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
