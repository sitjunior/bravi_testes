/*!
 * Component DateInput
 *
 * Componente de input de data
 * @author TENFEN JUNIOR, Silvio <silvio@tenfen.com.br>
 * @version 1.0
 * @package backend
 */

import React, { Component } from "react";
import InputMask from 'react-input-mask';
 
class DateInput extends Component {
  render() {
    return <InputMask {...this.props} mask="99/99/9999" maskChar="_" />;
  }
}

export default DateInput;
