import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/isLoading';
import { Form } from './styled';
import * as actions from '../../store/modules/operator/actions';
import axios from '../../services/axios';

export default function Operator() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.operator.loadingIn);
  const idState = useSelector((state) => state.operator.id);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('operator');
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(undefined);

  React.useEffect(() => {
    async function getData() {
      if (idState) {
        setId(idState);
        setLoading(true);
        const response = await axios.get(`/operator/${idState}`);
        const operator = response.data;
        setUser(operator.user);
        setLevel(operator.level);
        setLoading(false);
      }
      return dispatch(actions.idRequest({ undefined }));
    }
    getData();
  }, [idState, dispatch]);
  console.log(id);

  function handleSubmit(e) {
    e.preventDefault();
    let erro = false;
    if (user.length < 4 || user.length > 250) {
      toast.error('Tamanho de usuário inválido');
      erro = true;
    }
    if (!id) {
      if (password.length < 4 || password.length > 25) {
        toast.error('Senha deve conter entre 4 e 25 caracteres');
        erro = true;
      }
    }
    if (!erro) {
      dispatch(actions.operatorRequest({ user, password, level, id }));
    }
  }

  return (
    <Container>
      <h1>{id ? 'Editando operador' : 'Registrar operador'}</h1>
      <Loading isLoading={isLoading || loading} />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Usuário:
          <input
            type="text"
            value={user}
            placeholder="Digite o usuário!"
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
        <label>
          Senha:
          <input
            type="text"
            value={password}
            placeholder="Digite a senha!"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Nivel do operador:
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </label>
        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
