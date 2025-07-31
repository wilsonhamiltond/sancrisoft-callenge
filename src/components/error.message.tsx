import { styled } from "styled-components";

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.85em;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '⚠️';
    font-size: 1em;
  }
`;

export default ErrorMessage;
