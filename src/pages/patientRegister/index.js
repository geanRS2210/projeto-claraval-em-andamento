import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/isLoading';

export default function Login() {
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [nameMom, setNameMom] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [cpf, setCPF] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [number, setNumber] = useState('');
  const [dateLen, setDateLen] = useState(0);
  const [cpfLen, setCpfLen] = useState(0);
  const [telephoneLen, setTelLen] = useState(0);
  const [isloading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    let erro = false;
    if (name.length < 4 || name.length > 50) {
      erro = true;
      toast.error('Nome deve conter entre 4 e 50 caracteres');
    }
    if (dateBirth.length === 0 || dateBirth.length < 10) {
      erro = true;
      toast.error('data de nascimento incorreta');
    }
    if (nameMom.length < 4 || nameMom.length > 50) {
      erro = true;
      toast.error('Nome da mãe deve conter entre 4 e 50 caracteres');
    }
    if (cpf.length === 0 || cpf.length < 14) {
      erro = true;
      toast.error('Cpf incorreto');
    }
    if (!telephone.length === 13 || !telephone.length === 14) {
      erro = true;
      toast.error('telefone incorreto');
    }

    if (!erro) {
      try {
        setLoading(true);
        await axios.post('/patient', {
          name,
          date_birth: dateBirth,
          mom: nameMom,
          cpf,
          address,
          number,
          telephone,
        });
        setLoading(false);
        toast.success(`paciente cadastrado com sucesso!!`);
      } catch (err) {
        const errors = get(err, 'response.data.errors', []);

        errors.map((erro1) => toast.error(erro1));
      }
    }
    return this;
  }

  return (
    <Container>
      <h1>Cadastrar paciente</h1>
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
            placeholder="digite o nome"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </label>
        <label>
          data de nascimento:
          <input
            type="text"
            placeholder="00/00/0000"
            onChange={(e) => {
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10);
              }
              if (dateLen <= e.target.value.length) {
                if (e.target.value.length === 2) {
                  e.target.value += '/';
                }
                if (e.target.value.length === 5) {
                  e.target.value += '/';
                }
                setDateLen(e.target.value.length);
              } else {
                setDateLen(e.target.value.length);
              }
              setDateBirth(e.target.value);
            }}
            value={dateBirth}
          />
        </label>
        <label>
          nome da mãe:
          <input
            type="text"
            placeholder="digite o nome da mãe"
            onChange={(e) => {
              setNameMom(e.target.value);
            }}
            value={nameMom}
          />
        </label>
        <label>
          cpf:
          <input
            type="text"
            placeholder="digite o cpf"
            onChange={(e) => {
              if (e.target.value.length > 14) {
                e.target.value = e.target.value.slice(0, 14);
              }
              if (cpfLen <= e.target.value.length) {
                if (e.target.value.length === 3) {
                  e.target.value += '.';
                }
                if (e.target.value.length === 7) {
                  e.target.value += '.';
                }
                if (e.target.value.length === 11) {
                  e.target.value += '-';
                }
                setCpfLen(e.target.value.length);
              } else {
                setCpfLen(e.target.value.length);
              }
              setCPF(e.target.value);
            }}
            value={cpf}
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
          status do agendamento:
          <select
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            value={status}
          >
            <option value="aguardando">Aguardando</option>
            <option value="agendado">Agendado</option>
          </select>
        </label>
        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
