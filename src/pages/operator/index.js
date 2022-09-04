import React, { useState } from 'react';
import { FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { Container, DivPatient, Add } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import Loading from '../../components/isLoading';
import * as action from '../../store/modules/operator/actions';
import { toast } from 'react-toastify';

export default function Operator() {
  const dispatch = useDispatch();
  const [operators, setOperator] = useState([]);
  const [isloading, setLoading] = useState(false);

  React.useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await axios.get('/operator');
      console.log(response);
      setLoading(false);
      setOperator(response.data);
    }
    getData();
  }, []);
  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const element = e.currentTarget.nextSibling;
    element.setAttribute('display', 'inline-block');
    e.currentTarget.remove();
  }
  const handleDelete = async (e, id, index) => {
    e.preventDefault();
    e.persist();
    try {
      setLoading(true)
      if (!id) return toast.error('usuário não encontrado')
      await axios.delete(`/operator/${id}`);
      const novosOperators = [...operators]
      novosOperators.splice(index, 1);
      setOperator(novosOperators);
      setLoading(false);
      toast.success('Operador deletado com sucesso')
    } catch (e) {
      toast.error('erro desconhecido')
      console.log(e);
      setLoading(false);
    }
  }
  return (
    <Container>
      <h1>Operadores</h1>
      <Add>
        <span>
          <a href="/operatorRegister">Add</a>
        </span>
      </Add>
      <Loading isLoading={isloading} />
      {operators.map((operator, index) => (
        <DivPatient key={operator.id}>
          <span>{operator.user}</span>
          <span>{operator.level}</span>{' '}
          <a
            href={`/operator/${operator.id}/edit`}
            onClick={() => {
              const { id } = operator;
              dispatch(action.idRequest({ id }));
            }}
          >
            <FaEdit className="icon" />
          </a>{' '}
          <a
            href={`/operator/${operator.id}/delete`}
            onClick={(e) => {
              handleDeleteAsk(e)
            }}
          >
            {' '}
            <FaWindowClose className="icon"/>
          </a>
            <FaExclamation onClick={(e)=> handleDelete(e, operator.id, index)} display='none' cursor='pointer' />
        </DivPatient>
      ))}
    </Container>
  );
}
