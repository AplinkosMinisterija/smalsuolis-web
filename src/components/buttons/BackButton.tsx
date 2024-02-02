import styled from 'styled-components';
import { ButtonColors } from '../../utils/constants';
import { buttonsTitles } from '../../utils/texts';
import Icon from '../other/Icons';
import Button from './Button';

const BackButton = () => {
  return (
    <StyledButton
      leftIcon={<StyledBackIcon name="back" />}
      variant={ButtonColors.TRANSPARENT}
      type="button"
      height={32}
      buttonPadding="0"
      color="black"
    >
      {buttonsTitles.back}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  min-width: 0px;
  margin-top: 20px;
  width: fit-content;
  button {
    padding-right: 16px;
    border: none;
    font-size: 1.6rem;
    color: #121926;
  }
`;

const StyledBackIcon = styled(Icon)`
  cursor: pointer;
  margin-right: 4px;
  font-size: 2rem;
  align-self: center;
  color: #000000;
`;

export default BackButton;
