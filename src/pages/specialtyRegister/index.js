import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/isLoading';
import { Form } from './styled';
import * as actions from '../../store/modules/specialty/actions';

export default function Login() {
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.specialty.loadingIn);
  const [doctor, setDoctor] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [telephone, setTelephone] = useState('');
  const [notes, setNotes] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [telephoneLen, setTelLen] = useState('');

  async function handleSubmit(e) {
    e.preventDefault(
      actions.specialtyRequest({
        doctor,
        address,
        number,
        telephone,
        notes,
        specialty,
      })
    );

    let err = false;
    if (doctor.length < 4 || doctor.length > 100) {
      err = true;
      toast.error('Nome com tamanho inválido');
    }
    if (address.length === 0 || number.length === 0) {
      err = true;
      toast.error('Obrigatório preencher endereço e numero');
    }
    if (telephone.length < 13 || telephone.length > 14) {
      err = true;
      toast.error('Obrigatório preencher o telefone');
    }
    if (!err) {
      dispatch(
        actions.specialtyRequest({
          doctor,
          address,
          number,
          telephone,
          notes,
          specialty,
        })
      );
    }
  }
  return (
    <Container>
      <h1>Cadastrar Especialistas</h1>
      <Loading isLoading={isloading} />
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>
          Nome:
          <input
            type="text"
            placeholder="digite o nome do médico"
            onChange={(e) => {
              setDoctor(e.target.value);
            }}
            value={doctor}
          />
        </label>
        <label>
          endereço:
          <input
            type="text"
            placeholder="digite o endereço"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
          />
          <input
            type="number"
            placeholder="N*"
            onChange={(e) => {
              if (e.target.value.length > 5) {
                e.target.value = e.target.value.slice(0, 5);
              }
              setNumber(e.target.value);
            }}
            value={number}
          />
        </label>
        <label>
          Telefone:
          <input
            type="text"
            placeholder="(00) 99999-9999"
            onChange={(e) => {
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 14);
              }
              if (telephoneLen <= e.target.value.length) {
                if (e.target.value.length === 2) {
                  e.target.value = `(${e.target.value})`;
                }
                if (e.target.value.length === 8) {
                  e.target.value += '-';
                }
                setTelLen(e.target.value.length);
              } else {
                setTelLen(e.target.value.length);
              }
              setTelephone(e.target.value);
            }}
            value={telephone}
          />
        </label>
        <label>
          Especialidade:
          <input
            type="text"
            placeholder="digite aqui a especialidade"
            onChange={(e) => {
              setSpecialty(e.target.value);
            }}
            value={specialty}
          />
        </label>
        <label>
          Comentarios:
          <input
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            value={notes}
            placeholder="Coloque observações aqui!!"
          />
        </label>
        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
