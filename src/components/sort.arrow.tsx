import { styled } from "styled-components";

interface SortArrowProps {
    $direction: 'asc' | 'desc';
}

const SortArrowSpan = styled.span<SortArrowProps>`
  font-size: 0.8em;
  line-height: 1;
  display: inline-block;
  transition: transform 0.2s ease-in-out;
  transform: ${props => (props.$direction === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: #7d7d7d;
  padding: 3px 8px;
`;

export default SortArrowSpan