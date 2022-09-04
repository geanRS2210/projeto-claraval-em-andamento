import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { loginRequest } from '../../store/modules/auth/actions';
import { Form } from './styled';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/isLoading';

export default function Login(props) {
  const dispatch = useDispatch();
  const prevPath = get(props, 'location.state.prevPath', '/login');
  const isloading = useSelector((state) => state.auth.loadingIn);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    let val = false;
    if (password.length < 4 || password.length > 50) {
      val = true;
    }
    if (user.length < 4 || user.length > 250) {
      val = true;
    }
    if (val) {
      toast.error('Usuário ou senha inválida');
    }
    dispatch(loginRequest({ user, password, prevPath }));
  }
  return (
    <Container>
      <h1>Login</h1>
      <Loading isLoading={isloading} />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          placeholder="Seu Usuário"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Sua Senha"
        />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
