import { styled } from "styled-components";

interface MessageProps{
    $type: string;
}
const Message = styled.p<MessageProps>`
  font-size: 1em;
  ${(props) => (props.$type === 'primary' ? 'color: #0b1ef1ff;' : '')}
  ${(props) => (props.$type === 'success' ? 'color: #008000;' : '')}
  ${(props) => (props.$type === 'error' ? 'color: #EF4444;' : '')}
  ${(props) => (props.$type === 'primary' ? 'background-color: #8992ebff;' : '')}
  ${(props) => (props.$type === 'success' ? 'background-color: #00800014;' : '')}
  ${(props) => (props.$type === 'error' ? 'background-color: #faf1f1;' : '')}
  max-width: 350px;
  padding: 20px;
  border-radius: 10px;
`;

export default Message;
