import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { Nav } from './styled';
import A, { Logged } from './operatorA';

export default function Header() {
  const isAdm = useSelector((state) => state.auth.level);
  const log = useSelector((state) => state.auth.logedIn);

  let adm = false;
  if (isAdm && isAdm === 'administrator') adm = true;

  return (
    <Nav>
      <a href="/patient">
        {' '}
        <FaHome size={24} />{' '}
      </a>
      <Logged isLog={log} />
      <A isAdm={adm} />
    </Nav>
  );
}
