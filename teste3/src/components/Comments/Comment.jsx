/*!
 * Component Comment
 *
 * Componente de Comentário
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";

export class Comment extends Component {
  createMarkup = ( data ) => ({
		__html: data
  });

  render() {
    var reg = this.props.reg;
    var avatar = 'https://www.gravatar.com/avatar/'+reg.gravatar+'?s=100';
    
    return (
      <div className="row comment">
        <div className="col-sm-3">
          <div className="comment-user">
            <div className="comment-avatar"><img src={avatar} alt={reg.user} /></div>
            <div className="comment-name">{reg.user}</div>
            <div className="comment-company">{reg.company}</div>
          </div>
        </div>

        <div className="col-sm-9">
          <div className="comment-data">
            <div className="comment-date">Atualizado em: <strong>{reg.date}</strong></div>
            <div className="comment-content" dangerouslySetInnerHTML={ this.createMarkup( reg.comment ) } />
            <div className="comment-options">
              { reg.user_id === localStorage.getItem('userId') && reg.last_comment === 1 &&
                <a href="#!" onClick={reg.editButton} title="Editar">
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                </a>
              }

              { reg.user_id === localStorage.getItem('userId') && reg.last_comment === 1 &&
                <a href="#!" onClick={reg.removeButton} title="Remover">
                  <i className="fa fa-times" aria-hidden="true"></i>
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Comment;
