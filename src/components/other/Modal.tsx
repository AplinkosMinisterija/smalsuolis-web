import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../styles";
interface ModalProps {
  visible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal = ({ visible, children, onClose }: ModalProps) => {
  const handleCloseOnEscape = useCallback(
    (event: any) => {
      if (event.key === "Escape") {
        onClose && onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleCloseOnEscape);
    return () => window.removeEventListener("keydown", handleCloseOnEscape);
  }, [visible, handleCloseOnEscape]);

  if (!visible) {
    return <React.Fragment />;
  }
  return (
    <ModalContainer
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;

        onClose && onClose();
      }}
    >
      {children}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  margin: auto;
  background-color: #0b1b607a;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  overflow-y: auto;
  padding: 16px;
  @media ${device.mobileL} {
    padding: 0px;
  }
`;

export default Modal;
