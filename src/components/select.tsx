import { styled } from "styled-components";

interface InputProps {
  $hasError?: boolean;
}

const Select = styled.select<InputProps>`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border: 1px solid ${(props) => (props.$hasError ? '#e74c3c' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 1em;
  color: #333333;
  box-sizing: border-box;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 18px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6a5acd;
    box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.2);
  }
`;

export default Select;