import React, { useState } from 'react';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';

import { Container, DivPatient, Add } from '../../styles/GlobalStyles';
import Loading from '../../components/isLoading';

export default function Patient() {
  const [Patients, setPatient] = useState([]);
  const [isloading, setLoading] = useState(false);
  React.useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await axios.get('/patient');
      setPatient(response.data);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <Container>
      <h1>Pacientes para agendar</h1>
      <Add>
        <span>
          <a href="/patientRegister">Add</a>
        </span>
      </Add>
      <Loading isLoading={isloading} />
      {Patients.map((patient) => (
        <DivPatient key={patient.id}>
          <span>{patient.name}</span>
          <span>{patient.date_birth}</span>
          <span>{patient.cpf}</span>
          <Link to={`/patient/${patient.id}/edit`}>
            {' '}
            <FaEdit className="icon" />{' '}
          </Link>
          <Link to={`/patient/${patient.id}/delete`}>
            {' '}
            <FaWindowClose className="icon" />{' '}
          </Link>
        </DivPatient>
      ))}
    </Container>
  );
}
