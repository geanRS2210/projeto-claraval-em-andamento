import styled from 'styled-components';

export const Title = styled.h1`
  background: green;

  small {
    font-size: 12pt;
    margin-left: 15px;
    color: #999;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    display: flex;
    flex-direction: column;
  }
  input {
    height: 40px;
    border-radius: 5px;
    border: 2px solid #ddd;
    margin-bottom: 10px;
  }
`;
