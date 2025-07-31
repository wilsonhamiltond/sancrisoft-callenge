import { styled } from "styled-components";

interface InputProps {
  $hasError?: boolean;
}

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid ${(props) => (props.$hasError ? '#e74c3c' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 1em;
  color: #333333;
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #a0a0a0;
  }

  &:focus {
    outline: none;
    border-color: #6a5acd;
    box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.2);
  }
`;

export default Input;