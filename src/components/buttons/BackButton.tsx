import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ButtonColors, IconName } from '../../utils/constants';
import { buttonsTitles } from '../../utils/texts';
import Icon from '../other/Icons';
import Button from './Button';

const BackButton = ({ backUrl }: { backUrl: string }) => {
  const navigate = useNavigate();
  return (
    <StyledButton
      leftIcon={<StyledBackIcon name={IconName.back} />}
      variant={ButtonColors.TRANSPARENT}
      onClick={() => navigate(backUrl)}
      type="button"
      height={32}
      color="black"
    >
      {buttonsTitles.back}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  min-width: 0px;
  margin-top: 20px;
  padding-left: 0;
  width: fit-content;
  border: none;
  font-size: 1.6rem;
  color: rgb(20, 83, 45);
`;

const StyledBackIcon = styled(Icon)`
  cursor: pointer;
  margin-right: 4px;
  font-size: 2rem;
  align-self: center;
  color: rgb(20, 83, 45);
`;

export default BackButton;
