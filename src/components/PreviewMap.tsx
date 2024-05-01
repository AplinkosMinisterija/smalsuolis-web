import { useRef, useState } from 'react';
import styled from 'styled-components';
import { device } from '../styles';
import { FieldWrapper, FeatureCollection, Button } from '@aplinkosministerija/design-system';
import Icon from './Icons';
import { IconName } from '../utils';

const mapsHost = import.meta.env.VITE_MAPS_HOST;

interface MapProps {
  height?: string;
  onSave?: (data: any) => void;
  error?: string;
  value?: FeatureCollection;
  label?: string;
  showError?: boolean;
  preview?: boolean;
}

const PreviewMap = ({ height = '230px', error, value, showError = true, label }: MapProps) => {
  const iframeRef = useRef<any>(null);
  const [showModal, setShowModal] = useState(false);

  const src = `${mapsHost}/edit?preview=true`;

  const handleLoadMap = () => {
    if (!value) return;
    iframeRef?.current?.contentWindow?.postMessage({ geom: value }, '*');
  };

  return (
    <FieldWrapper showError={showError} error={error} label={label}>
      <Container $showModal={showModal} $error={!!error}>
        <InnerContainer $showModal={showModal}>
          <StyledButton
            popup={showModal}
            onClick={(e) => {
              e.preventDefault();

              setShowModal(!showModal);
            }}
          >
            <StyledIconContainer>
              <StyledIcon name={showModal ? IconName.exitFullScreen : IconName.fullscreen} />
            </StyledIconContainer>
          </StyledButton>
          <StyledIframe
            allow="geolocation *"
            ref={iframeRef}
            src={src}
            $width={'100%'}
            $height={showModal ? '100%' : `${height || '230px'}`}
            style={{ border: 0 }}
            allowFullScreen={true}
            onLoad={handleLoadMap}
            aria-hidden="false"
            tabIndex={1}
          />
        </InnerContainer>
      </Container>
    </FieldWrapper>
  );
};

const Container = styled.div<{
  $showModal: boolean;
  $error: boolean;
}>`
  width: 100%;
  ${({ $showModal }) =>
    $showModal &&
    `
  display: flex;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  z-index: 1001;
  `}
  ${({ theme, $error }) => $error && `border: 1px solid ${theme.colors.error};`}
`;

const InnerContainer = styled.div<{
  $showModal: boolean;
}>`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  ${({ $showModal }) =>
    $showModal &&
    `
    padding: 16px;
  `}

  @media ${device.mobileL} {
    padding: 0;
  }
`;

const StyledIframe = styled.iframe<{
  $height: string;
  $width: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`;

const StyledButton = styled.div<{ popup: boolean }>`
  position: absolute;
  z-index: 10;
  top: ${({ popup }) => (popup ? 30 : 15)}px;
  left: ${({ popup }) => (popup ? 28 : 11)}px;
  min-width: 28px;
  height: 28px;
  @media ${device.mobileL} {
    top: 10px;
    left: 10px;
  }

  border-color: #e5e7eb;
  background-color: white !important;
  width: 30px;
  height: 30px;
  padding: 0;
  box-shadow: 0px 18px 41px #121a5529;
`;

const StyledIcon = styled(Icon)`
  font-size: 3rem;
  color: #6b7280;
`;

const StyledIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PreviewMap;
