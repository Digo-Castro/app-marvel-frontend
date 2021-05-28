import React from 'react';
import { Link } from 'react-router-dom';

const EditUser = () => (
  <main>
    <div>
      <div className="form-title">
        <span>Editar usuário</span>
      </div>
      <form method="POST" action="http://localhost:8080/edit-user">
        <label htmlFor="email">
          <input type="email" name="email" id="email" />
        </label>
        <label htmlFor="newEmail">
          <input type="newEmail" name="newEmail" id="newEmail" />
        </label>
        <label htmlFor="newPassword">
          <input type="newPassword" name="newPassword" id="newPassword" />
        </label>
        <div className="btn-container">
          <button type="submit" className="btn success">Atualizar</button>
        </div>
      </form>
      <div className="redirect-conteiner">
        <Link to="/" className="link">Voltar</Link>
      </div>
    </div>
  </main>
);

export default EditUser;
