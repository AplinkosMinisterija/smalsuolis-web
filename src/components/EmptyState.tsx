import styled from 'styled-components';
import { IconName } from '../utils';
import Icon from './Icons';

const EmptyState = ({
  title = '',
  description = '',
  icon = IconName.airBallon,
}: {
  title: string;
  description?: string;
  icon: IconName;
}) => {
  return (
    <Container>
      <StyledIcon name={icon} />
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Container>
  );
};
export default EmptyState;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  text-align: center;
`;

const Title = styled.div`
  font-size: 1.9rem;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  margin: 30px 0px 20px 0px;
`;

const Description = styled.div`
  line-height: 24px;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 24px;
  text-align: center;
`;
