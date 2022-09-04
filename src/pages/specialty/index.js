import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaWindowClose } from 'react-icons/fa';

import { Container, DivPatient, Add } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import Loading from '../../components/isLoading';

export default function Operator() {
  const [specialtyes, setSpecialty] = useState([]);
  const [isloading, setLoading] = useState(false);

  React.useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await axios.get('/specialty');
      console.log(response);
      setLoading(false);
      setSpecialty(response.data);
    }
    getData();
  }, []);
  return (
    <Container>
      <h1>Especialistas</h1>
      <Add>
        <span>
          <a href="/specialtyRegister">Add</a>
        </span>
      </Add>
      <Loading isLoading={isloading} />
      {specialtyes.map((specialty) => (
        <DivPatient key={specialty.doctor}>
          <span>{specialty.doctor}</span>
          <span>{specialty.address}</span>
          <span>{specialty.telephone}</span>
          <span>{specialty.notes}</span>
          <Link to={`/specialty/${specialty.id}/edit`}>
            {' '}
            <FaEdit className="icon" />{' '}
          </Link>
          <Link to={`/specialty/${specialty.id}/delete`}>
            {' '}
            <FaWindowClose className="icon" />{' '}
          </Link>
        </DivPatient>
      ))}
    </Container>
  );
}
