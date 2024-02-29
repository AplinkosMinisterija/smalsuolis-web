import styled from 'styled-components';
import { Size } from '../utils/constants';
import Icon from './Icons';

interface InfoItemProps {
  icon: string;
  value?: string | JSX.Element;
  size?: Size;
}

const InfoItem = ({ icon, value }: InfoItemProps) => (
  <IconTextWrapper>
    <StyledIcon name={icon} />
    <StyledText>{value || 'Nenurodyta'}</StyledText>
  </IconTextWrapper>
);

const StyledIcon = styled(Icon)`
  font-size: 1.8rem;
  margin-top: -3px;
`;

const StyledText = styled.span`
  font-size: 1.2rem;
`;

const IconTextWrapper = styled.div`
  display: grid;
  grid-template-columns: 22px 1fr;
  align-items: center;
  color: #84899f;
`;

export default InfoItem;
