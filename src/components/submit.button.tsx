import { styled } from "styled-components";
interface ButtonProps {
  $isDisabled?: boolean;
}

const SubmitButton = styled.button.attrs<ButtonProps>(props => ({
  disabled: props.$isDisabled
})) <ButtonProps>`
  width: 100%;
  padding: 5px 20px;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  ${(props) =>
    !props.$isDisabled
      ?
      `cursor: pointer;
      transition: background-color 0.2s ease, box-shadow 0.2s ease;
      background-color: #6a5acd;
      &:hover {
        background-color: #5a4acb;
        box-shadow: 0 4px 15px rgba(106, 90, 205, 0.3);
      }

      &:active {
        background-color: #4a3aab;
      }
  `
      : `
        background-color: gray;
      `}

`;

export default SubmitButton;