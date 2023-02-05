/*!
 * VIEW ForgotMyPassWord
 *
 * View do Layout de Esqueci Minha Senha
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { useState } from 'react';
import Api from 'services/Api.jsx';
import logo from "assets/img/peb-logo2.png";
import hangarLogo from "assets/img/hangar-logo.png";
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
}));

export default function ForgotMyPassword({history}) {
    const classes = useStyles();
    
    const [ loginFields, setLoginFields ] = useState({
      email: '',
      loadingStyle: {display:'none'},
      info: '',
      error: '',
    });

    const createMarkup = ( data ) => ({
      __html: data
    });

    async function handleSubmit(e) {
        e.preventDefault();

        setLoginFields({
          loadingStyle: {display:'block'},
        });

        await Api.post('/wp-json/pbadc/v1/forgot_password', {
          email: loginFields.email,
        }).then( res => {

          if ( res.data.info_msg !== '' ) {
            setLoginFields({
              ...loginFields,
              email: '',
              info: res.data.info_msg,
              error: '',
              loadingStyle: {display:'none'},
            });
          } else {
            setLoginFields({
              ...loginFields,
              info: '',
              error: res.data.error_msg,
              loadingStyle: {display:'none'},
            });
          }
          return;
        } )
        .catch( err => {
          setLoginFields( { ...loginFields, error: err.response.data.message, loadingStyle: false } );
        } )
    }

    const handleOnChange = ( event ) => {
      setLoginFields( { ...loginFields, [event.target.name]: event.target.value } );
    };

    const { email, loadingStyle, info, error } = loginFields;

    return (
      <div className="peers ai-s fxw-nw h-100vh login-page">
        <div className={classes.root+' MuiLinearProgress-container'} style={loadingStyle}>
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
          <h4 className="fw-300 c-grey-900 mB-40 title">Recuperar Senha</h4>
          { error && <div className="alert alert-danger" dangerouslySetInnerHTML={ createMarkup( error ) }/> }
          { info && <div className="alert alert-info" dangerouslySetInnerHTML={ createMarkup( info ) }/> }
          <div className="msg-info">
            <p>Informe o e-mail cadastrado para uso do sistema e logo após clique em <strong>Enviar E-mail</strong>. Você receberá uma nova senha de acesso.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-normal text-dark">E-mail</label>
              <input type="text" name="email" className="form-control" value={email} onChange={handleOnChange} autoComplete="off" required autoFocus />
            </div>
            <div className="form-group">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-send">
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                      Enviar E-mail
                    </button>
                  </div>
                  <div className="col-md-6">
                    <div className="text-right">
                      <a href="/"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Voltar</a>
                    </div>
                  </div>
                </div>
              </div>
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
