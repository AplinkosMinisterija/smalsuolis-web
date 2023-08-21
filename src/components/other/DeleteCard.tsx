import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { device } from "../../styles";
import Button, { ButtonColors } from "../buttons/Button";
import Icon from "./Icons";
import Modal from "./Modal";
export interface DeleteCardProps {
  title: string;
  description: string;
  onSetClose: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
  deleteInProgress: boolean;
  declineLabel?: string;
  agreeLabel?: string;
  action?: string;
  visible?: boolean;
}

const DeleteCard = ({
  title,
  description,
  onSetClose,
  handleDelete,
  deleteInProgress,
  declineLabel = "Ne",
  agreeLabel = "Taip",
  visible = false
}: DeleteCardProps) => {
  const cardRef = useRef<any>(null);

  const handleClickOutside = useCallback(
    (event: any) => {
      if (cardRef?.current && !cardRef.current.contains(event.target)) {
        onSetClose(false);
      }
    },
    [onSetClose]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return (
    <Modal visible={visible}>
      <Container ref={cardRef}>
        <IconContainer onClick={() => onSetClose(false)}>
          <StyledIcon name="close" />
        </IconContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ButtonRow>
          <StyledButton
            type="button"
            onClick={() => handleDelete()}
            variant={ButtonColors.DANGER}
            loading={deleteInProgress}
          >
            {agreeLabel}
          </StyledButton>
          <StyledButton
            type="button"
            onClick={() => onSetClose(false)}
            variant={ButtonColors.TRANSPARENT}
          >
            {declineLabel}
          </StyledButton>
        </ButtonRow>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 18px 41px #121a5529;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media ${device.mobileL} {
    padding: 50px;
    max-width: 100%;
  }
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #fe5b78;
  text-align: center;
`;

const Description = styled.div`
  text-align: center;
  font: normal normal medium 16px/26px;
  color: #7a7e9f;
  text-align: center;

  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  margin-top: 32px;
  @media ${device.mobileL} {
    margin-top: 16px;
  }
`;
const ButtonRow = styled.div`
  display: flex;
  @media ${device.mobileL} {
    flex-direction: column;
    width: 100%;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
`;

const StyledIcon = styled(Icon)`
  color: rgb(122, 126, 159);
  font-size: 3rem;
  margin: 10px 10px auto auto;
`;

export default DeleteCard;
