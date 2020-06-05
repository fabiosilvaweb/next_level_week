import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import "./styles.css";
const Alert: React.FC = () => {
  return (
    <div id="page-alert-success">
      <span><FiCheckCircle /></span>
      <h1>Cadastro Concluído!</h1>
    </div>
  )
}

export default Alert