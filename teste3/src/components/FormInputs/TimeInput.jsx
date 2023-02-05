/*!
 * Component TimeInput
 *
 * Componente de input de minutos
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";
import InputMask from 'react-input-mask';
 
class TimeInput extends Component {
  render() {
    return <InputMask {...this.props} mask="99:99" maskChar="_" />;
  }
}

export default TimeInput;
