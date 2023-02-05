/*!
 * VIEW Login
 *
 * View do Layout de Login
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { useContext, useState } from 'react';
import Api from 'services/Api.jsx';
import logo from "assets/img/peb-logo2.png";
import hangarLogo from "assets/img/hangar-logo.png";
import AppContext from "context/AppContext";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
}));

export default function Login({history}) {
    const classes = useStyles();

    const [ store, setStore ] = useContext( AppContext );
    
    const [ loginFields, setLoginFields ] = useState({
      username: '',
      password: '',
      loadingDisplay: 'none',
      error: ''
    });

    const createMarkup = ( data ) => ({
      __html: data
    });

    async function handleSubmit(e) {
        e.preventDefault();

        setLoginFields({
          loadingDisplay: 'block',
        });

        await Api.post('/wp-json/pbadc/v1/authenticate', {
          username: loginFields.username,
          password: loginFields.password,
        }).then( res => {

          if ( res.data.error_msg !== undefined ) {
            setLoginFields({
              ...loginFields,
              error: res.data.error_msg,
              loadingDisplay: 'none',
            });
            return;
          }
  
          const { user_id, user_nicename, user_role, company_id, gravatar, api_key } = res.data;
  
          localStorage.setItem( 'userId', user_id );
          localStorage.setItem( 'userName', user_nicename );
          localStorage.setItem( 'userRole', user_role );
          localStorage.setItem( 'companyId', company_id );
          localStorage.setItem( 'gravatar', gravatar );
          localStorage.setItem( 'apiKey', api_key );
  
          setStore({
            ...store,
            userId: user_id,
            userName: user_nicename,
            userRole: user_role,
            companyId: company_id,
            apiKey: api_key
          });
  
          setLoginFields( {
            ...loginFields,
            loadingDisplay: 'none',
            userId: user_id,
            userName: user_nicename,
            userRole: user_role,
            companyId: company_id,
            apiKey: api_key,
          } )

          history.push(`admin/dashboard`);
        } )
        .catch( err => {
          setLoginFields( { ...loginFields, error: err.response.data.message, loadingDisplay: false } );
        } )
    }

    const handleOnChange = ( event ) => {
      setLoginFields( { ...loginFields, [event.target.name]: event.target.value } );
    };

    const { username, password, error, loadingDisplay } = loginFields;

    return (
      <div className="peers ai-s fxw-nw h-100vh login-page">
        <div className={classes.root+' MuiLinearProgress-container'} style={{display: loadingDisplay}}>
          <LinearProgress />
        </div>
        <div className="d-n@sm- peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv background">
          <div className="pos-a centerXY logo-container">
            <div className="bgc-white bdrs-50p pos-r logo">
              <img className="pos-a centerXY" src={logo} alt="Bravi - Teste 3" />
            </div>
          </div>
        </div>
        <div className="col-xs-12 col-md-4 peer pX-40 pT-80 h-100 bgc-white scrollable pos-r ps ps--active-y form">
          <h4 className="fw-300 c-grey-900 mB-40 title">Área do Cliente</h4>
          { error && <div className="alert alert-danger" dangerouslySetInnerHTML={ createMarkup( error ) }/> }
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-normal text-dark">Usuário ou E-mail</label>
              <input type="text" name="username" className="form-control" value={username} onChange={handleOnChange} autoComplete="off" required autoFocus />
            </div>
            <div className="form-group">
              <label className="text-normal text-dark">Senha</label>
              <input type="password" name="password" className="form-control" value={password} onChange={handleOnChange} autoComplete="off" required />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-lg btn-submit" >
                <i className="fa fa-sign-in" aria-hidden="true"></i>
                Entrar
              </button>
            </div>
            <div className="form-group">
              <p><a href="/esqueci-minha-senha"><i className="fa fa-unlock" aria-hidden="true"></i> Esqueci minha senha</a></p>
            </div>
          </form>
          <footer className="footer-login">
            <div className="row justify-content-md-center">
              <div className="col-sm-12">
                <span>Copyright © {(new Date().getFullYear())} - <strong>Bravi - Teste 3</strong>.</span>
              </div>
              <div className="col-sm-12">
                <div className="hangar">
                  <a className="hangar_link" href="https://hangar.digital" rel="noopener noreferrer" title="Desenvolvido por Hangar Digital" target="_blank">
                    <img className="hangar_link-logo" src={hangarLogo} alt="Hangar Digital" />
                  </a>
                  <div className="hangar_text"></div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    )
}
