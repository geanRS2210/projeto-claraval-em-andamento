import React from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaSignInAlt, FaUserAlt } from 'react-icons/fa';

import { A } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Adm({ isAdm }) {
  if (!isAdm) return <></>;
  return (
    <>
      <A href="/operator">Operadores</A>;<A href="/specialty">Especialistas</A>;
    </>
  );
}

export function Logged({ isLog }) {
  const dispatch = useDispatch();
  if (!isLog)
    return (
      <>
        <a href="/login">
          {' '}
          <FaUserAlt size={24} />{' '}
        </a>
      </>
    );
  return (
    <>
      <A>
        <FaSignInAlt
          cursor="pointer"
          size={24}
          onClick={() => dispatch(actions.loginFailure())}
        />
      </A>
    </>
  );
}

Adm.defaultProps = {
  isAdm: false,
};
Adm.propTypes = {
  isAdm: propTypes.bool,
};
Logged.defaultProps = {
  isLog: false,
};
Logged.propTypes = {
  isLog: propTypes.bool,
};
