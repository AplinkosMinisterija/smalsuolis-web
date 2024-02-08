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

export const ContentLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  align-self: center;
  align-items: center;
  padding: 0 40px;
  background-color: white;
  @media ${device.desktop} {
    max-width: 700px;
    border-radius: 16px;
    margin: 0 auto;
    padding: 40px;
    overflow-y: auto;
    height: fit-content;
  }
`;

export const ContentLayoutTitle = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 3.2rem;
  font-weight: 800;
  margin: 16px 0;
  text-align: center;
`;
