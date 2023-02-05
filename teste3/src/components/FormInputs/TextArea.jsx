/*!
 * Component TextArea
 *
 * Componente de textarea
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";

export class TextArea extends Component {
  render() {
    var pp = this.props.properties[0]
    
    return (<div className="row">
      <div className={this.props.ncols}>
        <div className="form-group">
          <label className="control-label">{pp.label}</label>
          <textarea name={pp.name} className={pp.bsClass} onChange={pp.onChange} value={pp.defaultValue} disabled={pp.disabled} />
        </div>
      </div>
    </div>)
  }
}

export default TextArea;
