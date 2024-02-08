import styled from 'styled-components';
import { device } from '../../styles';

export const Row = styled.div<{ columns?: number }>`
  display: grid;
  margin-top: 16px;
  grid-template-columns: repeat(${({ columns }) => columns || 3}, 1fr);
  gap: 16px;
  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

export const LoginTitle = styled.div`
  color: #121926;
  font-size: 1.8rem;
  font-weight: bold;
`;
